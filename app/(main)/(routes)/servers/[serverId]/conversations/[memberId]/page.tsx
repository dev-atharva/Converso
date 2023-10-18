import { ChatHeader } from "@/components/chat/chat-header";
import { getorcreateconversation } from "@/lib/conversation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface memberidpageprops {
  params: {
    memberId: string;
    serverId: string;
  };
}

const MemberIdPage = async ({ params }: memberidpageprops) => {
  const profile = await currentProfile();
  if (!profile) {
    return redirectToSignIn();
  }
  const currentmember = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
    include: {
      profile: true,
    },
  });

  if (!currentmember) {
    return redirect("/");
  }

  const conversation = await getorcreateconversation(
    currentmember.id,
    params.memberId
  );
  if (!conversation) {
    return redirect(`/servers/${params.serverId}`);
  }
  const { memberOne, memberTwo } = conversation;

  const othermember =
    memberOne.profileId === profile.id ? memberTwo : memberOne;

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        imageUrl={othermember.profile.imageUrl}
        name={othermember.profile.name}
        serverId={params.serverId}
        type="conversation"
      />
    </div>
  );
};

export default MemberIdPage;
