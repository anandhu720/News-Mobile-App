import {article_url} from "../config/rest_config";


export async function getArticles(){
    try{
        let articles = await fetch(article_url,{
            method:'get',
            headers: new Headers({
                'Content-Type': 'text/plain'
            })
        });


        let result = await articles.json();
        // console.log(result);
        articles = null;

        return result.articles;
    }catch(err){
        console.log(err);
    }
}
