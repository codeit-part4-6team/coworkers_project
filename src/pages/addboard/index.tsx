import { useState } from 'react';
import Button from '@/components/common/Button';
import Plus from '@/assets/plus_large.svg';
import CloseIcon from '@/assets/x_icon.svg';
import { createArticle, imageFile } from '@/lib/articleApi';
import { useRouter } from 'next/router';

const AddBoard = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewImage(null);
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    let imageUrl: string | undefined = undefined;

    if (image) {
      setIsUploading(true);
      try {
        const formData = new FormData();
        formData.append('image', image);

        const imageResponse = await imageFile(image);
        if (imageResponse && imageResponse.data) {
          imageUrl = imageResponse.data.url;
        } else {
          throw new Error('이미지 URL을 가져오지 못했습니다.');
        }
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
        alert('이미지 업로드에 실패했습니다.');
        return;
      } finally {
        setIsUploading(false);
      }
    }

    setIsSubmitting(true);
    try {
      const articleData: any = {
        title,
        content,
      };

      if (imageUrl) {
        articleData.image = imageUrl;
      }

      const response = await createArticle(articleData);

      if (response.status === 201) {
        const createdArticleId = response.data.id;
        alert('게시글이 성공적으로 등록되었습니다.');
        router.push(`/boards/${createdArticleId}`);
      } else {
        throw new Error('게시글 등록 실패');
      }
    } catch (error) {
      console.error('게시글 등록 실패:', error);
      alert('게시글 등록에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-4 mt-10 md:px-6 md:mt-14 lg:px-[360px]">
      <div className="md:flex md:justify-between md:items-center">
        <h3 className="text-2lg font-medium text-text-primary md:text-xl md:font-bold">
          게시글 쓰기
        </h3>
        <div className="w-[184px] hidden md:block">
          <Button
            option="solid"
            size="large"
            text={isUploading || isSubmitting ? '처리 중...' : '등록'}
            disabled={isUploading || isSubmitting}
            onClick={handleSubmit}
          />
        </div>
      </div>
      <div className="w-full border-t border-border-primary-10 my-6"></div>
      <div className="flex gap-1.5 items-center">
        <p className="text-color-brand-tertiary font-medium text-md md:text-lg">
          *
        </p>
        <p className="text-text-primary font-medium text-md md:text-lg">제목</p>
      </div>
      <input
        type="text"
        placeholder="제목을 입력해주세요."
        className="rounded-[12px] p-4 bg-background-secondary border border-border-primary-10 w-full h-12 mt-4 focus:outline-none"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="flex gap-1.5 items-center mt-8">
        <p className="text-color-brand-tertiary font-medium text-md md:text-lg">
          *
        </p>
        <p className="text-text-primary font-medium text-md md:text-lg">내용</p>
      </div>
      <textarea
        placeholder="내용을 입력해주세요."
        className="rounded-[12px] p-4 bg-background-secondary border border-border-primary-10 w-full h-60 mt-4 focus:outline-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <p className="text-text-primary font-medium text-md mt-4 md:text-lg">
        이미지
      </p>
      <div className="mt-4 relative border w-40 h-40 md:w-60 md:h-60 rounded-[12px] border-border-primary-10 bg-background-secondary flex flex-col justify-center items-center gap-3">
        {previewImage ? (
          <>
            <img
              src={previewImage}
              alt="미리보기 이미지"
              className="w-full h-full object-cover rounded-[12px]"
            />
            <button
              className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1"
              onClick={handleRemoveImage}
            >
              <CloseIcon className="w-6 h-6 text-white" />
            </button>
          </>
        ) : (
          <label
            htmlFor="image-upload"
            className="cursor-pointer flex flex-col items-center gap-3"
          >
            <Plus className="text-text-default w-6 h-6 md:w-12 md:h-12" />
            <p className="text-md font-regular text-text-default md:text-lg">
              이미지 등록
            </p>
            <input
              id="image-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        )}
      </div>
      <div className="mt-10 md:hidden">
        <Button
          option="solid"
          size="large"
          text={isUploading || isSubmitting ? '처리 중...' : '등록'}
          disabled={isUploading || isSubmitting}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default AddBoard;
