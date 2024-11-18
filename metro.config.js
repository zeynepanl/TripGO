const { getDefaultConfig } = require("@expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

// Expo'nun varsayılan Metro yapılandırmasını alın
const defaultConfig = getDefaultConfig(__dirname);

// .cjs uzantısını desteklemek için resolver yapılandırmasını ekleyin
defaultConfig.resolver.sourceExts.push("cjs");

// NativeWind entegrasyonu ile yapılandırmayı dışa aktarın
module.exports = withNativeWind(defaultConfig, { input: "./global.css" });
