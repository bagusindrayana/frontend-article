export const ssr = false;
import { PUBLIC_API_URL } from "$env/static/public";
export async function load({ params })  {
    let article = {};
    await fetch(`${PUBLIC_API_URL}/article/${params.id}`)
            .then((res) => res.json())
            .then((data) => {
                article = data;
                console.log(article);
            })
            .catch((err) => {
                console.error(err);
            });
    return article;
}