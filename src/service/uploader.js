export async function uploadImage(file){
  const data =  new FormData();
  data.append('file', file);
  
}