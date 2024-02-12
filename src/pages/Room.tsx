import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useEffect, useRef } from "react";

interface Params {
    roomID: string;
    [key: string]: string | undefined;
}

const Room = () => {
    const { roomID } = useParams<Params>();
    const containerRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        if (containerRef.current) {
            meeting(containerRef.current);
        }
    }, [roomID]);

    const meeting = async (element: any) => {
        // give your' appid and serverSecret;
        const appID = 777777777;
        const serverSecret = "ep' private ";
        const safeRoomID: string = roomID ?? "";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            safeRoomID,
            Date.now().toString(),
            "ep-private"
            );
        const zp = ZegoUIKitPrebuilt.create(kitToken);

        zp.joinRoom({
            container: element,
            scenario: {
                mode: ZegoUIKitPrebuilt.GroupCall,
            },
        });
    };


    return <div ref={containerRef} style={{ width: "100vw", height: "100vh" }}></div>;
};

export default Room;