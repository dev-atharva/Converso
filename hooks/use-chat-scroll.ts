import { useEffect, useState } from "react";

type Chatscrollprops = {
  chatRef: React.RefObject<HTMLDivElement>;
  bottomRef: React.RefObject<HTMLDivElement>;
  shouldLoadmore: boolean;
  loadMore: () => void;
  count: number;
};

export const useChatScroll = ({
  chatRef,
  bottomRef,
  shouldLoadmore,
  loadMore,
  count,
}: Chatscrollprops) => {
  const [hasinitialized, sethasinitialized] = useState(false);
  useEffect(() => {
    const topdiv = chatRef?.current;
    const handleScroll = () => {
      const scrollTop = topdiv?.scrollTop;
      if (scrollTop === 0 && shouldLoadmore) {
        loadMore();
      }
    };
    topdiv?.addEventListener("scroll", handleScroll);
    return () => {
      topdiv?.removeEventListener("scroll", handleScroll);
    };
  }, [shouldLoadmore, loadMore, chatRef]);

  useEffect(() => {
    const bottomdiv = bottomRef?.current;
    const topdiv = chatRef?.current;
    const shouldautoscroll = () => {
      if (!hasinitialized && bottomdiv) {
        sethasinitialized(true);
        return true;
      }
      if (!topdiv) {
        return false;
      }
      const distancefrombottom =
        topdiv.scrollHeight - topdiv.scrollTop - topdiv.clientHeight;
      return distancefrombottom <= 100;
    };
    if (shouldautoscroll()) {
      setTimeout(() => {
        bottomRef?.current?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    }
  }, [bottomRef, chatRef, count, hasinitialized]);
};
