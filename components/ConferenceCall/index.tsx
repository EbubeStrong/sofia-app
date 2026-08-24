"use client";

import React, { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useCallStore } from "@/stores/videoCallStore";
import BrandLogo from "@/assets/logo/Sofia Central Logo.svg";

type TVideoCallProps = {
  userId: string;
  userName: string;
};

const SofiaCallRoom: React.FC<TVideoCallProps> = ({ userId, userName }) => {
  const { roomId }: { roomId: string } = useParams();
  const videoContainerRef = useRef<HTMLDivElement | null>(null);

  const appID = Number(process.env.NEXT_PUBLIC_ZEGO_APP_ID);
  const serverSecret = process.env.NEXT_PUBLIC_ZEGO_APP_SECRET as string;
  const roomID = roomId as string;

  const { isInCall, startCall, endCall } = useCallStore();

  const initCall = useCallback(async () => {
    try {
      const { ZegoUIKitPrebuilt } = await import(
        "@zegocloud/zego-uikit-prebuilt"
      );

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        userId,
        userName
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);

      zp.joinRoom({
        container: videoContainerRef.current!,
        sharedLinks: [
          {
            name: "Meeting room with Patient B",
            url:
              window.location.protocol +
              "//" +
              window.location.host +
              window.location.pathname,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        showTextChat: true,
        maxUsers: 2,
        branding: {
          logoURL:
            "https://ik.imagekit.io/ukx6v9muj/Sofiamatics/Frame%202085664636%20(2).png",
        },
        showRoomTimer: true,
        onJoinRoom: () => {
          startCall(roomID, userId, userName);
        },
        onLeaveRoom: () => {
          endCall();
        },
      });
    } catch (err) {
      console.error("Failed to initialize call:", err);
    }
  }, [appID, endCall, roomID, serverSecret, startCall, userId, userName]);

  useEffect(() => {
    if (!userId || !roomID || !userName) {
      return;
    }

    initCall();
  }, [initCall, roomID, userId, userName]);

  return (
    <div className="w-full h-[100vh] relative bg-[#F4F6F8]">
      <div ref={videoContainerRef} className="w-full h-full" />

      {!isInCall && (
        <div className="absolute bottom-0 left-0 right-0 pb-6">
          <p className="flex items-center justify-center gap-3 text-[#1175C0] font-medium">
            <Image
              src={BrandLogo}
              alt="Logo of the brand"
              className="w-[68px] h-auto"
              priority
            />{" "}
            Powered by Sofia
          </p>{" "}
        </div>
      )}
    </div>
  );
};

export default SofiaCallRoom;
