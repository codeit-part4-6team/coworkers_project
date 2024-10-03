import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';
import Button from '@/components/common/Button';
import Picture from '@/assets/picture.svg';
import Pencil from '@/assets/pencil.svg';
import { uploadImage, editGroup, getGroup } from '@/lib/groupApi';
const EditTeamPage = () => {
  const [teamName, setTeamName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [errors, setErrors] = useState({ image: '', name: '' });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { groupId } = router.query;

  useEffect(() => {
    const fetchGroupDetails = async () => {
      if (groupId) {
        try {
          setIsLoading(true);
          const response = await getGroup(Number(groupId));
          setTeamName(response.data.name);
          setImageUrl(response.data.image);
        } catch (error) {
          console.error('Failed to load group details:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchGroupDetails();
  }, [groupId]);

  const handleTeamNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTeamName(event.target.value);
    setErrors((prev) => ({ ...prev, name: '' }));
  };

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsLoading(true);
      try {
        const response = await uploadImage(file);
        setImageUrl(response.data.url);
        setErrors((prev) => ({ ...prev, image: '' }));
      } catch (err) {
        setErrors((prev) => ({
          ...prev,
          image: '이미지 업로드에 실패했습니다. 다시 시도해주세요.',
        }));
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({ image: '', name: '' });

    if (!imageUrl) {
      setErrors((prev) => ({ ...prev, image: '프로필 이미지를 넣어주세요.' }));
    }

    if (!teamName.trim()) {
      setErrors((prev) => ({ ...prev, name: '이름을 입력해주세요.' }));
    }

    if (!imageUrl || !teamName.trim()) return;

    setIsLoading(true);
    try {
      await editGroup(Number(groupId), { image: imageUrl, name: teamName });
      router.push(`/group/${groupId}`);
    } catch (err: any) {
      setErrors((prev) => ({
        ...prev,
        name: '팀 수정에 실패했습니다. 다시 시도해주세요.',
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const getInputClassName = (error: string) =>
    `w-full h-12 placeholder-text-default border ${error ? 'border-status-danger' : 'border-border-primary-10'} bg-background-secondary rounded-xl px-4 py-2 mt-3 focus:outline-none focus:ring-0`;

  return (
    <div className="flex flex-col items-center justify-center bg-background-primary text-text-primary py-[140px]">
      <div className="text-4xl font-medium mb-20 text-center">팀 수정하기</div>
      <div className="w-full max-w-[480px]">
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <div className="text-lg font-medium">팀 프로필</div>
            <label
              htmlFor="profileImage"
              className="relative size-16 mt-3 block cursor-pointer"
            >
              <div className="size-full rounded-full border-2  border-border-primary-10 bg-background-secondary flex items-center justify-center overflow-hidden focus:border-none">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Team profile"
                    className="size-full object-cover"
                  />
                ) : (
                  <Picture className="text-text-secondary" size={32} />
                )}
              </div>
              <div className="absolute bottom-0 right-0 rounded-full bg-background-secondary">
                <Pencil className="text-text-inverse" size={12} />
              </div>
              <input
                id="profileImage"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={isLoading}
              />
            </label>
            {errors.image && (
              <div className="text-status-danger text-md mt-3">
                {errors.image}
              </div>
            )}
          </div>
          <div className="text-lg font-medium mt-6">팀 이름</div>
          <input
            type="text"
            className={getInputClassName(errors.name)}
            placeholder="팀 이름을 입력해주세요."
            value={teamName}
            onChange={handleTeamNameChange}
            disabled={isLoading}
          />
          {errors.name && (
            <div className="mt-2 text-status-danger text-md">{errors.name}</div>
          )}

          <div className="mt-10">
            <Button
              option="solid"
              size="large"
              text="수정하기"
              type="submit"
              disabled={isLoading}
            />
          </div>
        </form>
        <div className="mt-6 text-center">
          팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
        </div>
      </div>
    </div>
  );
};

export default EditTeamPage;
