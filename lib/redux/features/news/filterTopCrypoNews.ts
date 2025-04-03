import { NewsData } from "./newsSlice";

export const filterTopCryptoNews = (data: any) => {
    console.log(data);

    let cryptoNews : any = [];
    if(data.length === 0) {
        return [];
    }
    
    
    if (data && data.length > 0) {

        cryptoNews = data         
          .sort((a:any, b:any) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()) 
          .map((news:any) => {
            return {
              id: news.article_id,
              title: news.title,
              summary: news.description,
              url: news.link,
              publishedAt: news.pubDate,
              source: news.source_name
            } as NewsData
          })
          .slice(0, 5);   
           
    }

    return cryptoNews as NewsData[];

}