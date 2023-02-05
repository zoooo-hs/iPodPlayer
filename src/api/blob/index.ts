export const blobReaderName = "blobReader";
export interface IBlobReader {
    read: (uri: string) => Promise<Blob>
}