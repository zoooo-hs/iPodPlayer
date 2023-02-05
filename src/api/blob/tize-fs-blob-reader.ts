import { filesystem } from "tizen-common-web";
import IBlobReader from ".";

export default class TizenFileSystemBlobReader implements IBlobReader {
    read = (uri: string): Promise<Blob> => {
        return new Promise((onSuccess, onFailure) => {
        filesystem.openFile(uri, "r")
            .readBlobNonBlocking(
                (blob) => {
                    onSuccess(blob);
                },
                (error) => {
                    onFailure(error);
                }
            )
        });
        // try {
        //     const fileBlob = readBlobInternal();
        //     return Promise.resolve(fileBlob);
        // } catch (e) {
        //     return Promise.reject(e);
        // }
    
        // function readBlobInternal() {
        //     var fileHandler = filesystem.openFile(uri, "r");
        //     return fileHandler.readBlob();
        // }
    };

}