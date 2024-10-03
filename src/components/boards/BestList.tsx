import { useState, useEffect } from 'react';
import { getArticle } from '@/lib/articleApi';
import BestCard from './BestCard';

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

const BestList = () => {
  const [bestArticle, setBestArticle] = useState<Article[]>([]);
  const [visibleCount, setVisibleCount] = useState(3);

  const fetchArticle = async () => {
    try {
      const data = await getArticle({
        page: 1,
        pageSize: 3,
        orderBy: 'like',
      });
      const response = data.data;
      setBestArticle(response.list);
    } catch (error) {
      console.error(error);
    }
  };

  const handleResize = () => {
    const width = window.innerWidth;
    if (width >= 1024) {
      setVisibleCount(3);
    } else if (width >= 768) {
      setVisibleCount(2);
    } else {
      setVisibleCount(1);
    }
  };

  useEffect(() => {
    fetchArticle();
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {bestArticle.slice(0, visibleCount).map((board) => (
        <BestCard key={board.id} board={board} />
      ))}
    </div>
  );
};

export default BestList;
