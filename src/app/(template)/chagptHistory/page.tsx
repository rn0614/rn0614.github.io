"use client";
import { useState } from "react";
import JSZip from "jszip";
import { Box, Button, Text } from "@radix-ui/themes";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";

export default function FileUploaderPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadLink, setDownloadLink] = useState<string | null>(null);
  const router = useRouter();

  // 파일명에서 특수기호 제거 함수
  function sanitizeFilename(title: string): string {
    return title.replace(/[^a-zA-Z0-9가-힣\s]/g, "").trim(); // 영문, 숫자, 한글, 공백만 허용
  }

  // JSON → Markdown 변환 함수
  async function convertJsonToMarkdown(jsonData: any) {
    const groupedData: Record<string, { role: string; parts: string[] }[]> = {};

    jsonData.forEach((data: any) => {
      let title = data.title || "Unknown Title";
      title = sanitizeFilename(title);

      if (!groupedData[title]) groupedData[title] = [];

      if (data.mapping) {
        Object.values(data.mapping).forEach((entry: any) => {
          const message = entry.message;
          if (message) {
            const parts = message.content?.parts || [];
            if (parts.length === 0 || (parts.length === 1 && parts[0] === ""))
              return;

            groupedData[title].push({
              role: message.author?.role || "unknown",
              parts,
            });
          }
        });
      }
    });

    return groupedData;
  }

  // JSON 파일을 읽고 Markdown 변환 후 ZIP 파일 생성
  const handleUpload = async () => {
    if (!file) return alert("JSON 파일을 선택하세요.");

    setIsProcessing(true);
    setDownloadLink(null);

    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = async () => {
      try {
        const jsonData = JSON.parse(reader.result as string);
        const mdData = await convertJsonToMarkdown(jsonData);

        // ZIP 압축 생성
        const zip = new JSZip();

        Object.entries(mdData).forEach(([title, conversations]) => {
          if (!title) return;

          let mdContent = `# ${title}\n\n`;
          conversations.forEach(({ role, parts }) => {
            mdContent += `*${role}*\n`;
            parts.forEach((part) => {
              mdContent += `${part}  \n`; // 개행 유지
            });
            mdContent += "\n";
          });

          zip.file(`${title}.md`, mdContent);
        });

        const zipBlob = await zip.generateAsync({ type: "blob" });
        const zipUrl = URL.createObjectURL(zipBlob);
        setDownloadLink(zipUrl);

        router.push(zipUrl);
      } catch (error) {
        console.error("파일 변환 오류:", error);
        alert("파일 변환 중 오류가 발생했습니다.");
      } finally {
        setIsProcessing(false);
      }
    };
  };

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        flexDirection: "column",
        gap: "20px",
        paddingTop: "20px",
      }}
    >
      <Box>
        <Text>이 화면은 json파일을 md 파일로 변경하는 화면입니다.</Text>
      </Box>
      <input
        className={styles.jsonInput}
        type="file"
        accept="application/json"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <Button onClick={handleUpload} disabled={isProcessing}>
        {isProcessing ? "변환 중..." : "변환 및 ZIP 다운로드"}
      </Button>
      {downloadLink && (
        <a
          href={downloadLink}
          download="converted-md-files.zip"
          className="mt-4 text-blue-600 underline"
        >
          ZIP 파일 다운로드
        </a>
      )}
    </main>
  );
}
