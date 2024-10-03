import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getDetailArticle, editArticle, imageFile } from '@/lib/articleApi';
import Plus from '@/assets/plus_large.svg';
import CloseIcon from '@/assets/x_icon.svg';
import Button from '@/components/common/Button';

const EditArticle = () => {
  const router = useRouter();
  const { id } = router.query;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialImageUrl, setInitialImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchArticleData = async () => {
        try {
          const response = await getDetailArticle(Number(id));
          setTitle(response.data.title);
          setContent(response.data.content);
          if (response.data.image) {
            setPreviewImage(response.data.image);
            setInitialImageUrl(response.data.image);
          }
        } catch (error) {
          console.error('게시글 가져오기 실패:', error);
        }
      };

      fetchArticleData();
    }
  }, [id]);

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
    setInitialImageUrl(null);
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    let imageUrl: string | null = initialImageUrl;

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
        setIsUploading(false);
        return;
      } finally {
        setIsUploading(false);
      }
    }

    try {
      await editArticle(Number(id), {
        title,
        content,
        image: imageUrl,
      });
      router.push(`/boards/${id}`);
    } catch (error) {
      console.error('게시글 수정 실패:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-4 mt-10 md:px-6 md:mt-14 lg:px-[360px]">
      <h3 className="text-2lg font-medium text-text-primary md:text-xl md:font-bold">
        게시글 수정하기
      </h3>

      <div className="mt-4">
        <div className="flex gap-1.5 items-center">
          <p className="text-color-brand-tertiary font-medium text-md md:text-lg">
            *
          </p>
          <p className="text-text-primary font-medium text-md md:text-lg">
            제목
          </p>
        </div>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded-[12px] p-4 bg-background-secondary border border-border-primary-10 w-full h-12 mt-4 focus:outline-none"
          placeholder="제목을 입력하세요"
        />
      </div>

      <div className="mb-4">
        <div className="flex gap-1.5 items-center mt-8">
          <p className="text-color-brand-tertiary font-medium text-md md:text-lg">
            *
          </p>
          <p className="text-text-primary font-medium text-md md:text-lg">
            내용
          </p>
        </div>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="rounded-[12px] p-4 bg-background-secondary border border-border-primary-10 w-full h-60 mt-4 focus:outline-none"
          placeholder="내용을 입력하세요"
        />
      </div>

      <div className="mb-4">
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
      </div>

      <div className="flex justify-end gap-2">
        <Button
          option="solid"
          size="xsmall"
          text={isUploading || isSubmitting ? '처리 중...' : '등록'}
          disabled={isUploading || isSubmitting}
          onClick={handleSave}
        />
        <button
          onClick={() => router.push(`/boards/${id}`)}
          className="w-[74px] h-8 px-[12px] text-md font-semibold bg-status-danger text-text-inverse rounded-[12px]"
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default EditArticle;
