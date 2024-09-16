> react는 component의 상태를 관리하는 앱. 이게 웹상에서 돌아가기 위해 react-dom 라이브러리가 지원을 해서 웹상에서 돌아가고 있음.


react-native 는 모바일 어플리케이션에서 돌아가기 위해 react-dom 대신이라고 볼 수 있음.

react-native도 소스 자체가 실행되는 것이 아닌 해당 소스로 작성된 코드가 컴파일 시 android, IOS 기반 소스로 변환되어 사용됨.



expo cli  / react-native cli


expo 방식이 native와 연결등이 좀 편함.

```bash
npm i -g expo-cli

npx create-expo-app@latest

```


### React-Native 전용 태그
```tsx
import {Image, Text, TextInput, ScrollView, FlatList, View, StyleSheet} from 'react-native';


export default function App(){
  return (
    <View styles={styles.container}>
      <Text>Text입니다.</Text>
      <TextInput/>
      <Button title="버튼명칭"/>
      <StatusBar/>
    </View>
  )
}

const styles =  StyleSheet.create({
  container:{
    flex:1,
    padding:20
  },
  item:{
    padding:10,
    height:20
  }
})

```


ListView를 위한 태그들
- ScrollView   : 전체 렌더링, 단순 Scroll 이용시 사용
- FlatList        : 보이는 화면만 렌더링하는 List
- SectionList  : Grouping해서 사용하는 List

```


```


### 플랫폼 특화
```tsx
import {Platform, StyleSheet} from 'react-native';

const Component = Platform.select({  
  ios: () => require('ComponentIOS'),  
  android: () => require('ComponentAndroid'),  
})();

```



### 적용 Style
```tsx
const StyleAppliedPage =()=>{
  return(
    <View>
      <Text>style 이 List형태로 들어갈 땐 뒤의 스타일이 적용됨</Text>    
      <Text style ={[styles.first, styles.second]}>styles.second 적용됨</Text>
    </View>
  )
}
```


### 적용 Layout 관련
> 기본적으로 flex를 통해서 관리됨.  flexDirection:"column" 상태

```tsx
const FlexPage = ()=>{
  return (
    <View style={styles.container}>
      <View style={{flex:1, backgroundColor:'red'}}/>
      <View style={{flex:2, backgroundColor:'green'}}/>
      <View style={{flex:3, backgroundColor:'blue'}}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
})


```


### Image 적용
```tsx

// 일반적인 선언
<Image  
source={{uri: 'app_icon'}}  
style={{width: 40, height: 40}}  
/>


// Android 자산에 있는경우 asset: 선언
<Image  
source={{uri: 'asset:/app_icon.png'}}  
style={{width: 40, height: 40}}  
/>

```


### Interaction
```tsx
// button
<Button
  onPress={touchableHandler}
/>
```

```bash
# React-navation
npm install @react-navigation/native @react-navigation/native-stack

# expo
npx expo install react-native-screens react-native-safe-area-context

# bare
npm install react-native-screens react-native-safe-area-context
cd ios  
pod install  
```


```tsx

// navigation 조정

const Stack = createNativeStackNavigator();

const MyStack =  ()=>{
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
         name="Home"
         component={HomeSceen}
         options={{title:'Welcome'}}
        />
        <Stack.Screen name="Profile" component={ProfileScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}


const HomeScreen = ({navigation}) =>{
  return (
    <Button
      title="go other"
      onPress={()=>
        navition.navigate('Profile',{name:"Jane"})
      }
    />
  )
}

const ProfileScreen = ({navigation, route})=>{
  return <Text>This is profile</Text>
}

```


### Drag and Drop
```tsx
import React, {useRef} from 'react';
import {Animated, View, StyleSheet, PanResponder, Text} from 'react-native';

const App = () => {
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
      onPanResponderRelease: () => {
        Animated.spring(pan, {
          toValue: {x: 0, y: 0},
          useNativeDriver: true,
        }).start();
      },
    }),
  ).current;

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Drag & Release this box!</Text>
      <Animated.View
        style={{
          transform: [{translateX: pan.x}, {translateY: pan.y}],
        }}
        {...panResponder.panHandlers}>
        <View style={styles.box} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
});

export default App;

```



### Fetch
```tsx
const fetchData = async () => {
  fetch('https://mywebsite.com/mydata.json',{
    method: 'POST',
    headers:{
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstParam: 'yourValue',
      secondParam: 'yourOtherValue'
    })
  })
}
```