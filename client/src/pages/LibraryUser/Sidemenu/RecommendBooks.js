import React from "react";
import { Chatbot } from "../../../components";


function RecommendChat(){

      
return(
  <>
  <div className="text-2xl"> AI 도서 추천</div>
  <Chatbot option="/librarian/recommend_chatbot" />
  </>
)
}


export default RecommendChat;