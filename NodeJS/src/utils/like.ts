export const likeFunction = (Array: string[], id: string, add: boolean = true): string[] => {
    const LikeSet = new Set(Array);
    add ? LikeSet.add(id) : LikeSet.delete(id);

    const likeArray = [...LikeSet]

    return likeArray;
};  