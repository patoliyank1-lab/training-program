export const likeFunction = (Array: string[], id: string, add: boolean = true) => {
    const LikeSet = new Set(Array);
    add ? LikeSet.add(id) : LikeSet.delete(id);

    const likeArray = [...LikeSet]

    return {likeArray, length: likeArray.length};
};  