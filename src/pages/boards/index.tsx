import SearchInput from '@/components/boards/SearchInput';
import Card from '@/components/boards/Card';
import Arrow from '@/assets/ic_arrow_right.svg';
import FloatingButton from '@/components/common/FloatingButton';
import BestCard from '@/components/boards/BestCard';
import Dropdown, { DropdownOption } from '@/components/common/Dropdown';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getArticle } from '@/lib/articleApi';

interface Article {
  id: number;
  title: string;
  writer: {
    nickname: string;
    id: number;
  };
  createdAt: string;
  likeCount: number;
}

const Boards = ({ id }: Article) => {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await getArticle();
        const { list } = response.data;

        setArticles(list);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  const handleButtonClick = () => {
    router.push('/addboard');
  };

  const handleCardClick = (articleId: number) => {
    router.push(`/boards/${articleId}`);
  };

  const orderOprions: DropdownOption[] = [
    { label: '최신순', value: 'latest' },
    { label: '좋아요 많은순', value: 'like' },
  ];

  const handleOrderChange = (option: DropdownOption) => {
    console.log('Selected option:', option);
  };

  return (
    <div className="mt-8 px-4 md:mt-10 lg:mt-10 lg:px-[360px]">
      <h2 className="text-2lg font-bold text-text-primary mb-6 md:text-2xl">
        자유게시판
      </h2>
      <SearchInput />
      <div className="flex justify-between items-center my-6">
        <h3 className="text-lg font-medium text-text-primary md:text-xl">
          베스트 게시글
        </h3>
        <div className="flex items-center gap-0.5">
          <p className="text-text-default text-xs">더보기</p>
          <Arrow />
        </div>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <BestCard />
        <BestCard />
        <BestCard />
      </div>
      <div className="w-full border-t border-border-primary-10 my-8"></div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-text-primary md:text-xl">
          게시글
        </h3>
        <div>
          <Dropdown
            options={orderOprions}
            onChange={handleOrderChange}
            size="sm"
          />
        </div>
      </div>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        {articles.map((article) => (
          <div key={article.id} onClick={() => handleCardClick(article.id)}>
            <Card
              key={article.id}
              id={article.id}
              title={article.title}
              writerNickname={article.writer.nickname}
              createdAt={article.createdAt}
              likeCount={article.likeCount}
            />
          </div>
        ))}
      </div>
      <div className="fixed bottom-[230px] w-[104px] h-12 right-4 md:bottom-[125px] lg:bottom-[45px] lg:right-[360px]">
        <FloatingButton
          option="add"
          text="글쓰기"
          onClick={handleButtonClick}
        />
      </div>
    </div>
  );
};
export default Boards;
