function templaterFn(tp, name) {
  function get_tags() {
    let content = app.vault.read(tp.file.find_tfile(tp.file.title));
    let matches = content.match(/#(\w+)/g);
    return matches
      ? matches.map((tag) => tag.replace("#", "")).join(", ")
      : "untagged";
  }

  function get_category() {
    return tp.file.folder(true) || "Uncategorized";
  }

  function get_last_modified() {
    let file = tp.file.find_tfile(tp.file.title);
    let metadata = app.vault.getMetadata(file);
    return new Date(metadata.mtime).toISOString().split("T")[0]; // YYYY-MM-DD 형식 변환
  }

  function get_slug() {
    return tp.file.title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
  }

  function get_reading_time() {
    console.log("tp", tp);
    console.log(tp.file.title);
    let content = app.vault.read(tp.file.title);
    let wordCount = content.split(/\s+/).length;
    return String(Math.ceil(wordCount / 200)); // 문자열로 변환
  }

  switch (name) {
    case "get_tags":
      return get_tags();
    case "get_category":
      return get_category();
    case "get_last_modified":
      return get_last_modified();
    case "get_slug":
      return get_slug();
    case "get_reading_time":
      return get_reading_time();
    default:
      return null;
  }
}

module.exports = templaterFn;

/*
{
  async get_tags() {
    let content = await app.vault.read(tp.file.find_tfile(tp.file.title));
    let matches = content.match(/#(\w+)/g);
    return matches ? matches.map(tag => tag.replace("#", "")).join(", ") : "untagged";
  },

  async get_category() {
    return tp.file.folder(true) || "Uncategorized";
  },

  async get_last_modified() {
    let file = tp.file.find_tfile(tp.file.title);
    let metadata = await app.vault.getMetadata(file);
    return new Date(metadata.mtime).toISOString().split("T")[0]; // YYYY-MM-DD 형식 변환
  },

  get_slug() {
    return tp.file.title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
  },

  async get_reading_time() {
    let content = await app.vault.read(tp.file.find_tfile(tp.file.title));
    let wordCount = content.split(/\s+/).length;
    return String(Math.ceil(wordCount / 200)); // 문자열로 변환
  }
};
*/
