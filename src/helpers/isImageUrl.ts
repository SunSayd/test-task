export const isImageUrl = (url: string) => {
    return (/\.(JPG|jpg|jpeg|png)$/i).test(url);
}
