import { useMutation } from '@tanstack/react-query';
import { activateParty } from '@/api/home/PartyAPI/ActivateParty';

export const useActivateParty = () => {
    return useMutation({
        mutationFn: (partyId: number) => activateParty(partyId),
        onError: (error: any) => {
            console.error('Party activation failed:', error);
        }
    });
};
