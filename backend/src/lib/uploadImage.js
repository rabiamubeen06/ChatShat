export const uploadImageToSupabase = async(supabase, base64Image, bucket, fileNamePrefix) => {
    const matches = base64Image.match(/^data:(.+);base64,(.+)$/);
    if (!matches) {
        throw new Error("Invalid image format");
    }

    const mimeType = matches[1];
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, "base64");
    const fileExt = mimeType.split("/")[1];
    const fileName = `${fileNamePrefix}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, buffer, {
            contentType: mimeType,
            upsert: true,
        });

    if (uploadError) {
        throw new Error(uploadError.message);
    }

    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(fileName);

    return urlData.publicUrl;
};