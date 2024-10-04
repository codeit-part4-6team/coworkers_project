import SearchInput from '@/components/boards/SearchInput';
import Card from '@/components/boards/Card';
import FloatingButton from '@/components/common/FloatingButton';
import Dropdown, { DropdownOption } from '@/components/common/Dropdown';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getArticle } from '@/lib/articleApi';
import BestList from '@/components/boards/BestList';
import InfiniteScroll from 'react-infinite-scroll-component';

interface Article {
  id: number;
  title: string;
  image?: string;
  writer: {
    nickname: string;
    id: number;
  };
  createdAt: string;
  likeCount: number;
}

const Boards = () => {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [sortOrder, setSortOrder] = useState<string>('recent');
  const [keyword, setKeyword] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const pageSize = 6;

  const fetchArticles = async (
    searchKeyword = '',
    order = 'recent',
    page = 1,
  ) => {
    try {
      setIsLoading(true);
      const response = await getArticle({
        keyword: searchKeyword,
        orderBy: order,
        page: page,
        pageSize: pageSize,
      });
      const { list } = response.data;

      if (page === 1) {
        setArticles(list);
      } else {
        setArticles((prevArticles) => [
          ...prevArticles,
          ...list.filter(
            (article: Article) =>
              !prevArticles.some((a) => a.id === article.id),
          ),
        ]);
      }

      if (list.length < pageSize) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setArticles([]);
    setPage(1);
    setHasMore(true);
    fetchArticles(keyword, sortOrder, 1);
  }, [keyword, sortOrder]);

  useEffect(() => {
    if (page > 1) {
      fetchArticles(keyword, sortOrder, page);
    }
  }, [page]);

  const handleSearchChange = (searchKeyword: string) => {
    setKeyword(searchKeyword);
    setPage(1);
  };

  const handleOrderChange = (option: DropdownOption) => {
    setSortOrder(option.value);
    setPage(1);
  };

  const handleButtonClick = () => {
    router.push('/addboard');
  };

  const handleCardClick = (articleId: number) => {
    router.push(`/boards/${articleId}`);
  };

  const handleDeleteArticle = (id: number) => {
    setArticles(articles.filter((article) => article.id !== id));
  };

  const orderOptions: DropdownOption[] = [
    { label: '최신순', value: 'recent' },
    { label: '좋아요 순', value: 'like' },
  ];

  return (
    <div className="mt-8 px-4 md:mt-10 lg:px-6 2lg:max-w-[1200px] 2lg:mx-auto">
      <h2 className="text-2lg font-bold text-text-primary mb-6 md:text-2xl">
        자유게시판
      </h2>
      <SearchInput onSearchChange={handleSearchChange} />
      <div className="flex justify-between items-center my-6">
        <h3 className="text-lg font-medium text-text-primary md:text-xl">
          베스트 게시글
        </h3>
      </div>
      <div>
        <BestList />
      </div>
      <div className="w-full border-t border-border-primary-10 my-8"></div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-text-primary md:text-xl">
          게시글
        </h3>
        <div>
          <Dropdown
            options={orderOptions}
            onChange={handleOrderChange}
            size="sm"
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={articles.length}
        next={() => setPage((prevPage) => prevPage + 1)}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 mb-3">
          {articles.map((article) => (
            <div key={article.id} onClick={() => handleCardClick(article.id)}>
              <Card
                id={article.id}
                title={article.title}
                writerNickname={article.writer.nickname}
                createdAt={article.createdAt}
                likeCount={article.likeCount}
                type="article"
                onDelete={handleDeleteArticle}
                imageUrl={article.image}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>

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
