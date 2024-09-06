export const didUserLike = (reqUserId, post) =>{
    for(let user of post.likedPosts){
        if(user.id === reqUserId){
            return true;
        }
    }
    return false;
}