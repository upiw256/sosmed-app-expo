import { Dimensions } from "react-native";
const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

export const hp = persentage => {
    return (deviceHeight * persentage) / 100;
}

export const wp = persentage => {
    return (deviceWidth * persentage) / 100;
}