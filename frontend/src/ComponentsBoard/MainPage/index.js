import './index.css';

import CardWithThumbnail from './CardWithThumbnail';
import RandomLikeArticle from './RandomLikeArticle';
import RecentLikeArticle from './RecentLikeArticle';
import RecentLikeComment from './RecentLikeComment';
import RisingLikeArticle from './RisingLikeArticle';
import RisingViewArticle from './RisingViewArticle';

import { useEffect, useState } from 'react';

import { get } from '../../api';
import { addParams, pageRequest } from '../../utils';

function MainPage() {
    const [boards, setBoards] = useState([]);

    const loadRandomBoards = () => {
        const size = 3;
        
        get(addParams(
            `/api/v1/board`, 
            {
                ...pageRequest(0, size),
                random_mode: true,
            }
        ))
        .then(res => {
            setBoards(res.content)
        })
        .catch(err => {
            console.log("loadRandomBoards error");
        });
    };

    useEffect(() => {
        loadRandomBoards();
    }, [])
    return (
        <div className="Main">

            <main className="container">
                <div className="p-4 p-md-5 mb-4 rounded text-bg-dark">
                    <div className="col-md-6 px-0">
                        <h1 className="display-4 fst-italic">광고이미지 or 메인기사</h1>
                        <p className="lead my-3">충격! A씨가 B씨에게 커피뿌려 논란</p>
                        <p className="lead mb-0"><a href="#" className="text-white fw-bold">해당 광고 or 기사 링크</a></p>
                    </div>
                </div>

                <div className="row mb-2">
                    <div className="col-md-6">
                        <CardWithThumbnail />
                    </div>
                    <div className="col-md-6">
                        <CardWithThumbnail />
                    </div>
                </div>

                <div className="row g-5">
                    <div className="col-md-8">

                        <article className="blog-post">
                            <h2 className="blog-post-title mb-1 border-bottom">추천수 급상승 게시물</h2>
                            <RisingLikeArticle />
                        </article>

                        <article className="blog-post">
                            <h2 className="blog-post-title mb-1 border-bottom">조회수 급상승 게시물</h2>
                            <RisingViewArticle />
                        </article>

                        {boards.map(item => {return(

                        <article className="blog-post" key={item.id} >
                            <h2 className="blog-post-title mb-1 border-bottom">{item.name} 게시판</h2>
                            <RandomLikeArticle id={item.id} />
                        </article>

                        );})}

                    </div>

                    <div className="col-md-4">
                        <div className="position-sticky" style={{top: "2rem"}}>

                            <div className="p-4">
                                <h4 className="fst-italic border-bottom">최근 작성된 게시물</h4>
                                <RecentLikeArticle />
                            </div>

                            <div className="p-4">
                                <h4 className="fst-italic border-bottom">최근 작성된 댓글</h4>
                                <RecentLikeComment />
                            </div>
                        </div>
                    </div>
                </div>

            </main>

        </div>
    );
}

export default MainPage;
