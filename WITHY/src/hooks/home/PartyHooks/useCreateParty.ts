import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/api/axiosInstance";

interface CreatePartyParams {
  partyTitle: string;         // 사용자가 입력한 파티 이름
  metadata: {
    contentId: string;        // 파싱된 영상 ID
    contentTitle: string;     // 파싱된 영상 제목
  };
  platform: "OTT" | "YOUTUBE"; // 플랫폼 구분 (넷플릭스는 OTT, 유튜브는 YOUTUBE)
  timeStr: string;            // ISO 8601 포맷 (YYYY-MM-DDTHH:mm:ss)
  maxParticipants: number;
  isPrivate: boolean;
  password?: string | null;
}

export const useCreateParty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: CreatePartyParams) => {
      // API 명세서 규격 통합 POST 요청
      const response = await axiosInstance.post("/api/v1/parties", {
        title: params.partyTitle,
        contentId: params.metadata.contentId,
        contentTitle: params.metadata.contentTitle,
        platform: params.platform,
        scheduledActiveTime: params.timeStr,
        maxParticipants: params.maxParticipants,
        isPrivate: params.isPrivate,
        password: params.isPrivate ? params.password : null,
      });
      return response.data;
    },
    onSuccess: (data) => {
      // 생성 후 파티 목록 쿼리를 무효화하여 최신화합니다.
      queryClient.invalidateQueries({ queryKey: ["parties"] });
    },
    onError: (error: any) => {
      console.error("❌ 파티 생성 실패:", error.response?.data?.message || error.message);
    }
  });
};