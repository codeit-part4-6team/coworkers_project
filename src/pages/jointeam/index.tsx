import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';
import Button from '@/components/common/Button';
import { acceptGroupInvitation } from '@/lib/groupApi';

const JoinTeamPage = () => {
  const [teamLink, setTeamLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string }>({});
  const router = useRouter();

  const handleTeamLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTeamLink(e.target.value);
    setErrors({});
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!teamLink.trim()) {
      setErrors({ name: '팀 링크를 입력해주세요.' });
      return;
    }

    const url = new URL(teamLink);
    const token = url.searchParams.get('token');

    if (!token) {
      setErrors({ name: '유효한 팀 링크를 입력해주세요.' });
      return;
    }

    setIsLoading(true);
    try {
      const userEmail = 'user@example.com';
      await acceptGroupInvitation({ userEmail, token });
      router.push(`/groups/${token}`);
    } catch (error) {
      console.error('Failed to join group:', error);
      setErrors({ name: '그룹에 참여하는 중 오류가 발생했습니다.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-background-primary text-text-primary py-[140px]">
      <div className="sm:text-4xl text-2xl font-medium mb-6 sm:mb-20 text-center">
        팀 참여하기
      </div>
      <div className="w-full sm:max-w-[460px] px-4">
        <form onSubmit={handleSubmit}>
          <div className="text-lg font-medium mt-6">팀 링크</div>
          <input
            type="text"
            className="w-full h-12 text-primary placeholder-text-default border border-border-primary-10 bg-background-secondary rounded-xl px-4 py-2 mt-3 focus:outline-none focus:ring-0"
            placeholder="팀 링크를 입력해주세요."
            value={teamLink}
            onChange={handleTeamLinkChange}
            disabled={isLoading}
          />
          {errors.name && (
            <div className="mt-2 text-status-danger text-md">{errors.name}</div>
          )}

          <div className="mt-10">
            <Button
              option="solid"
              size="large"
              text="참여하기"
              type="submit"
              disabled={isLoading}
            />
          </div>
        </form>
        <div className="mt-6 text-center">
          공유받은 팀 링크를 입력해 참여할 수 있어요.
        </div>
      </div>
    </div>
  );
};

export default JoinTeamPage;
