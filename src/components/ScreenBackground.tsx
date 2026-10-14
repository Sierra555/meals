import { globalStyles } from "@/styles/global";
import { ReactNode } from "react";
import { ImageBackground, View } from "react-native";

type ScreenBackgroundProps = {
	children: ReactNode;
};

export default function ScreenBackground({
	children,
}: ScreenBackgroundProps) {
	return (
		<ImageBackground
			source={require("@/assets/images/backgrounds/main-background.png")}
			resizeMode="cover"
			style={globalStyles.mainSectionBackground}
		>
			<View style={globalStyles.shadow} />
			{children}
		</ImageBackground>
	);
}
