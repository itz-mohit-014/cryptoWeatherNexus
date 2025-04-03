"use client";

import React, { useEffect, useState } from "react";
import { Bell, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

type Notification = {
  id: string;
  message: string;
  timestamp: number;
};

export function NotificationPanel({ onClose }: { onClose: () => void }) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "2",
      message: "Weather alert: Heavy rain expected in New York",
      timestamp: Date.now(),
    },
    {
      id: "2",
      message: "Weather alert: Heavy rain expected in New York",
      timestamp: Date.now(),
    },
    {
      id: "2",
      message: "Weather alert: Heavy rain expected in New York",
      timestamp: Date.now(),
    },
    {
      id: "2",
      message: "Weather alert: Heavy rain expected in New York",
      timestamp: Date.now(),
    },
    {
      id: "2",
      message: "Weather alert: Heavy rain expected in New York",
      timestamp: Date.now(),
    },
    {
      id: "2",
      message: "Weather alert: Heavy rain expected in New York",
      timestamp: Date.now(),
    },
    {
      id: "2",
      message: "Weather alert: Heavy rain expected in New York",
      timestamp: Date.now(),
    },
    {
      id: "2",
      message: "Weather alert: Heavy rain expected in New York",
      timestamp: Date.now(),
    },
    {
      id: "2",
      message: "Weather alert: Heavy rain expected in New York",
      timestamp: Date.now(),
    },
    {
      id: "2",
      message: "Weather alert: Heavy rain expected in New York",
      timestamp: Date.now(),
    },
    {
      id: "2",
      message: "Weather alert: Heavy rain expected in New York",
      timestamp: Date.now(),
    },
    {
      id: "2",
      message: "Weather alert: Heavy rain expected in New York",
      timestamp: Date.now(),
    },
    {
      id: "2",
      message: "Weather alert: Heavy rain expected in New York",
      timestamp: Date.now(),
    },
  ]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const { toast } = useToast();

  // useEffect(() => {
  //   // For demo purposes, we'll simulate WebSocket with static notifications
  //   // In a real app, you would connect to a WebSocket server
  //   const mockSocket = {
  //     onmessage: null as ((event: { data: string }) => void) | null,
  //     close: () => {},
  //   }

  //   // Simulate connection
  //   setTimeout(() => {
  //     if (mockSocket.onmessage) {
  //       mockSocket.onmessage({
  //         data: JSON.stringify({
  //           id: "1",
  //           message: "Bitcoin price surged by 5% in the last hour",
  //           timestamp: Date.now(),
  //         }),
  //       })
  //     }
  //   }, 3000)

  //   setTimeout(() => {
  //     if (mockSocket.onmessage) {
  //       mockSocket.onmessage({
  //         data: JSON.stringify({
  //           id: "2",
  //           message: "Weather alert: Heavy rain expected in New York",
  //           timestamp: Date.now(),
  //         }),
  //       })
  //     }
  //   }, 7000)

  //   // Set up event handler
  //   const handleMessage = (event: { data: string }) => {
  //     const notification = JSON.parse(event.data) as Notification
  //     setNotifications((prev) => [notification, ...prev].slice(0, 5))

  //     toast({
  //       title: "New Notification",
  //       description: notification.message,
  //     })
  //   }

  //   mockSocket.onmessage = handleMessage

  //   return () => {
  //     mockSocket.close()
  //   }
  // }, [toast])

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen z-50 backdrop-blur-sm bg-black/10"
      onClick={() => onClose()}
    >
      <Card
        className="absolute top-20  right-4 sm:right-16  w-[90vw] max-w-[300px] md:max-w-[400px] h-full max-h-[80vh] sm:max-h-[60vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader className="pb-0 relative">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Bell className="h-4 w-4" />
            Recent Notifications
          </CardTitle>

          <X
            onClick={() => onClose()}
            className="text-destructive h-6 w-5 absolute top-3 right-4"
          />
        </CardHeader>

        <CardContent
          className="mt-4 sm:mt-0 pt-0 w-full h-[calc(100%-100px)] hide-scrollbar overflow-y-auto"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch", 
            overflowY: "auto",
          }}
        >
          {notifications.length === 0 && (
            <p className="text-center text-gray-600">
              There is no any notification.
            </p>
          )}

          <div className="flex flex-col gap-2">
            {notifications.length > 0 &&
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start gap-4 p-3 rounded-lg bg-muted/50"
                >
                  <Bell className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p>{notification.message}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {new Date(notification.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
