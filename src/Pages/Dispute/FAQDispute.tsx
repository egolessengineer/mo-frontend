import _debounce from 'lodash/debounce';
import { useEffect, useState } from "react";
import { Textfield, Typography } from "../../Components/Atoms";
import { Loader } from "../../Components/Atoms/Loader";
import { handleCustomError } from "../../Utils/helper";
import { GET_FAQ } from "../../sevices";


const FAQDispute = () => {
  const [isLoading , setIsLoading] = useState(false)
  const [FaqData , setFaqData] = useState <any> ()
  const [searchval , setSearchval] = useState("")

  async function handleGetFaq(){
    try{
      
        setIsLoading(true)        
        let res = await GET_FAQ() 
        setFaqData(res?.data)
    }    
    catch(error){
      handleCustomError(error);
    }
    finally{
      setIsLoading(false)
    }
  }

  useEffect(()=>{
    const debouncedSearch = _debounce((query) => {
      const filteredFaqs = FaqData.filter((faq:any) =>
        faq.question.toLowerCase().includes(query.toLowerCase())
      );
      setFaqData(filteredFaqs);
    }, 1000);
    
    if(searchval !== ""){
      debouncedSearch(searchval)
    }
    else{
      handleGetFaq()
    }

    return ()=> {
      debouncedSearch.cancel()
    }
  },[searchval])


  return (
    <div className="shadow-navbar rounded-[5px]">
      <div className="px-5 pt-5 pb-[10px] flex justify-between border-b-[1px] border-text-gray-50">
        <Typography
          label={"FAQ’s"}
          type="p"
          FontSize="2xl"
          classname="text-text-HeadLine-100 font-bold "
        />
        <div className="relative w-[500px] ">
          <div className="absolute z-30 top-[12px] left-[9px] ">
            <img src="/Assets/SearchIcon.svg" alt=""/>
          </div>
          <Textfield type="search" 
          placeHolder="Search FAQ" 
          onChange={(e:any)=>{setSearchval(e.target.value)}}
          value={searchval}
          className="!pl-12" />
        </div>
      </div>
      {isLoading? <Loader /> : 
      FaqData && FaqData.length === 0 ?<div className="text-center p-5">No Data</div> :  
      FaqData && FaqData.map((element:any, index:any) => {
        return (
          <div key={index} className="px-5 py-[10px] border-b-[1px] border-text-gray-50">
            <Typography
              label={
                element.question
              }
              color="primary"
              variant={200}
              FontSize="sm"
              classname="font-bold "
              type="p"
            />
            <Typography
              label={
                element.answer
              }
              color="primary"
              variant={300}
              FontSize="sm"
              type="p"
            />
          </div>
        );
      })}
    </div>
  );
};
export default FAQDispute;
