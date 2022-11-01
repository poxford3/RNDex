export const GenSelector = ({ limit, offset, text }) => {
  return (
    <TouchableOpacity
      style={styles.genButtons}
      onPress={() => {
        setLimit(limit);
        setOffset(offset);
        flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
        // console.log(text);
      }}
    >
      <Text style={{ textAlign: "center" }}>{text}</Text>
    </TouchableOpacity>
  );
};
