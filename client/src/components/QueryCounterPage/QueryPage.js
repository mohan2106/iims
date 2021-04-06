import React,{useState} from 'react';
import classes from './QueryPage.module.css';
import Single from './Single/Single';

const faqs = [
    {
        ques:'Where is Dance competetion hosted?',
        answer:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore cupiditate, quasi ex eum nihil rerum exercitationem nesciunt odio placeat veniam doloremque voluptatibus eveniet animi iusto voluptas illo velit, at eligendi?'
    },
    {
        ques:'My friend is not from IIT, Can he participate in cricket match?',
        answer:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore cupiditate, quasi ex eum nihil rerum exercitationem nesciunt odio placeat veniam doloremque voluptatibus eveniet animi iusto voluptas illo velit, at eligendi?'
    },
    {
        ques:'Can I get snacks in the event?',
        answer:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore cupiditate, quasi ex eum nihil rerum exercitationem nesciunt odio placeat veniam doloremque voluptatibus eveniet animi iusto voluptas illo velit, at eligendi?'
    },
    {
        ques:'Where to visit in case of medical emergency?',
        answer:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore cupiditate, quasi ex eum nihil rerum exercitationem nesciunt odio placeat veniam doloremque voluptatibus eveniet animi iusto voluptas illo velit, at eligendi?'
    },
    {
        ques:'I have registered for the event and will not be able to play due to some reason, what to do?',
        answer:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore cupiditate, quasi ex eum nihil rerum exercitationem nesciunt odio placeat veniam doloremque voluptatibus eveniet animi iusto voluptas illo velit, at eligendi?'
    }
];

const QueryPage = (props) => {
    const [askquery,setAskQuery] = useState("");
    const [showPastQuery,setShowPastQuery] = useState(false);
    const [btnText,setBtnText] = useState("Show Past Query");
    const handleChange = (data)=>{
        setAskQuery(data);
    }
    const handleQuerySubmit = ()=>{
        alert("Your Query Has Been Submitted");
    }

    const data = faqs.map(ele => {
        return <Single {...ele}/>;
    })

    const updateBtn = () => {
        if(!showPastQuery){
            setBtnText("Close Past Query");
        }else{
            setBtnText("Show Past Query");
        }
        setShowPastQuery(!showPastQuery);
    }


    return (
        <div className={classes.container}>
            <div className={classes.queryTitle}>
                Query Counter
            </div>
            <div className={classes.askQuery}>
                <div className={classes.ask_query_title}>
                    Ask Your Query
                </div>
                <form onSubmit={handleQuerySubmit}>
                    <textarea className={classes.ask_query_text_area} value={askquery} onChange={(e) => handleChange(e.target.value)} rows="5" placeholder="Type your query here"/>
                </form>
            </div>
            <div className={classes.past_query}>
    <button className={classes.see_past_query_btn} onClick={(event) => updateBtn()}>{btnText}</button>
                {showPastQuery ? 
                <div className={classes.faqcontainer}>
                    <div className={classes.container_fluid}>
                        {data}
                    </div>
                </div>:null}
            </div>
            
        </div>
    );

}

export default QueryPage;