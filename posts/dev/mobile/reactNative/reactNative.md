---
title: reactNative
excerpt: React Native의 전반적인 설정부터 배포까지 내용
categories:
  - Categories2
tags:
  - "#모바일"
  - "#모바일/react-native"
permalink: /categories2/20240917090101reactNative/
toc: true
toc_sticky: true
date: 2024-09-17
last_modified_at: 2024-09-17
---
# React-Native

## 개요
> facebook 에서 만든 하이브리드 모바일 라이브러리 react 는 사실 상태관리 라이브러리인 것이고 실제 디바이스에 관련된 라이브러리는 다음과 같다.
> web : react-dom
> mobile : react-natvie
> desktop-app : react-electron

1. 로컬 설정
    [모바일_Emulator_환경_설정](_github_open/개발환경/VSCODE/모바일_Emulator_환경_설정.md)
2. 기능
3. build
4. 배포


## Expo 프로젝트 생성
```shell
# download- expo
npx create-expo-app@latest

# reset 작업
npm run reset-project

```

# 기본 EXPO 폴더구조
![](_md파일/Pasted%20image%2020241203002227.png)

### expo 어플 배포
```shell
npm install -g eas-cli

eas login

eas build --platform android  

```



### VS 확장 프로그램
-  Expo Tools



-- emulator 실행관련
https://velog.io/@bi-sz/ReactNative-Expo-Android-Studio-%EC%97%90%EB%AE%AC%EB%A0%88%EC%9D%B4%ED%84%B0-%EC%97%B0%EA%B2%B0


-- expo 통한 배포 관련
https://docs.expo.dev/get-started/start-developing/


npm install -g eas-cli



```

eas build --platform android

```


-- 어플주소
https://expo.dev/artifacts/eas/32YqvChEKPMeZD8Vecbkh3.aab



### Expo Doc
- 파일베이스 라우팅( react랑 동일)
- layout 파일 적용시`_layout` 



```tsx
//stack 구조로 

export defualt function RootLayout(){
  return (
    <Stack>
    
    </Stack>
  )
}


```


# 코어 태그
```tsx
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, TextInput, View, Button, Pressible} from 'react-native';
const exImage = require("./assets/example-img.png")

const View = ()=>{
  return (
    <ScrollView style={styles.container}>
      <ImageBackground source={exImage} style={{flex:1]}}>
        <View>
          <Image source={logoImg}/>
          <Image source={{uri:"https://picsum.photos/200"}}
          <Text>IMAGE TEXT</Text>
          <Text></Text>
        </View>
        <View>
          <TextInput/>
        </View>
        <View>
           //ios에서는 color 적용 안됨. 
         <Button title="Press" onPress={()=>console.log("Button Press")} color="midnightblue" disabled/>
        </View>
        <Pressable onPress={()=>{}}>
          <Image source={logoImg} style={{width:300, height:300}}/>
        </Pressable>
      </ImageBackground>
      <StatusBar/>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})
```


# 스타일 관련 메인
```tsx

const styles = StyleSheet.create({
  styleView: {
    flex: 1,
    backgroundColor: '#fff',
    width:200,
    height:200,
    padding:50
  },
  styleText: {
    color:"white"
  }
})
```


# Press 관련

Press 이벤트 동작 방식
1. onPressIn => onPressOut => onPress

길게 눌렀을 때
1. onPressIn => onLongPress => onPressOut



# Modal
```tsx
const View = ()=>{
  const [isModalVisible, setModalVisible]= useState<boolean>(false);
  return (
    <View>
      <Pressible onPress={()=>{setModalVisible(pre=>!pre)}}>
        <Text>Modal Open</Text>
      </Pressible>
      <Modal visible={isModalVisible} onRequestClose={()=>setIsModalVisible(false)} animationType="slide" presentationStyle="pageSheet"> // presentationStyle 은 ios only
        <View style={styles.modalContent}>
          <Text>Modal</Text>
            <Pressible>
             <Text>Modal Close</Text>
            </Pressible>
        </View>
      </Modal>
    </View>  
  )
}

const styles = StyleSheet.create({
  modalContent:{
    flex:1,
    backgroundColor: "lightblue",
    padding: 60
  }
})


```