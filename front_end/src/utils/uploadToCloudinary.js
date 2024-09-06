const cloud_name = "dpanillp3";
const uplodadPreset = "devsta";

export const uploadToCloudinary = async (pics, fileType) => {
    if(pics && fileType){
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", uplodadPreset);
        data.append("cloud_name", cloud_name);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/${fileType}/upload`,
        {
            method: "POST",
            body: data,
        }); 
        console.log("res",res);
        const file = await res.json();
        console.log("file",file.url);
        return file.url
    }
    else{
        console.log("Error: No file or fileType provided");
    }
}