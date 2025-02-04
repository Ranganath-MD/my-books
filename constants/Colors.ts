export const Colors = {
  shark: {
    "50": "#F8F9FA",
    "100": "#E9ECEF",
    "200": "#DEE2E6",
    "300": "#CED4DA",
    "400": "#ADB5BD",
    "500": "#6C757D",
    "600": "#495057",
    "700": "#465058",
    "800": "#343A40",
    "900": "#212529",
    "950": "#000000",
  },
  icons: {
    primary: "#DA8F0D",
    secondary: "#A847DB",
  },
};

const tintColorLight = Colors.shark["900"];
const tintColorDark = Colors.shark["50"];

export const colors = {
  light: {
    text: Colors.shark["900"],
    background: Colors.shark["50"],
    tint: tintColorLight,
    icon: Colors.shark["700"],
    tabIconDefault: Colors.shark["700"],
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: Colors.shark["50"],
    background: Colors.shark["950"],
    tint: tintColorDark,
    icon: Colors.shark["400"],
    tabIconDefault: Colors.shark["400"],
    tabIconSelected: tintColorDark,
  },
};
