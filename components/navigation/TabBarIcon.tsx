import { Image, StyleSheet } from 'react-native';

type TabBarIconProps = {
  focused: boolean;
  image: any; // Image source can be imported as any type
};

export function TabBarIcon({ focused, image }: TabBarIconProps) {
  return (
    <Image
      source={image}
      style={[styles.icon, focused && styles.focusedIcon]}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 28,
    height: 28,
  },
  focusedIcon: {
    // Add any additional styling for focused icons if needed
  },
});
