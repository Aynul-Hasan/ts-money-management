import React ,{useState } from 'react'
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { FaTrashAlt} from 'react-icons/fa';

type Amount={
    amount:number,
    id: number;
    text: string;

}
type Data={
    id:number,
    text:string,
    amount:number
}[]
export const Home= () => {

    const [text, setText] = useState<string>('');
    const [amount, setAmount] = useState<number>()
    const [allData, setAllData] = useState<Data>([])
    const [totalAmount, setTotalAmount] = useState(0)
    const [income, setIncome] = useState(0)
    const [expace, setExpace] = useState(0)
   
    
    const deleteItem=(i:number)=>{
        const del=allData.filter((crrEl:any)=>{return crrEl.id !==i;});
        setAllData(del);
        let ps=0;
        let ng=0;
        let all=0;
          setIncome(0)
        setTotalAmount(0)
        setExpace(0)

        del.map((cr:Amount)=>{ 
           if(cr.amount===null){
               setIncome(0)
               setExpace(0)
               setTotalAmount(0)
            
           }
           else if(cr.amount>0){
              
                ps=ps+cr.amount
                setIncome(ps)
                all=ps+ng
                setTotalAmount(all)

            }else{
                ng=ng+cr.amount
                setExpace(ng)
                all=ps+ng
                setTotalAmount(all)
            }
        return 0;
           
        })
        
        
    

    }

  
  
    const managementControl=(event:any)=>{
        event.preventDefault();
       
        if(text&&amount){

            
            const newData={id: Math.random()*1967, text,amount};

             setAllData([...allData,newData]);
            
             
            if(amount>0){
                setIncome(income+amount)
                setTotalAmount(totalAmount+amount)
                setAmount(0)
            }else{
               setExpace(expace+amount)
               setTotalAmount(totalAmount+amount)   
               setAmount(0)         
            }
           
            setAmount(0);
            setText('')

        }else{
            alert(`please fill the input fild`)
        }
        // setTotalAmount(income +expace)

    }

    return (
        <>
             <div className=" container-fluid pt-4 bg-dark">
             <div className="row d-flex justify-content-center ">
            <div className="col-lg-5 col-sm-10">
            <h1 className="text-center text-white">Money Management</h1>
            <h4 className="bg-success text-center d-block w-100">Current Balance</h4>
            <div className="bg-white text-center py-2" >
                <h5 className={totalAmount>0?"text-center text-success fw-bolder ":"text-center text-danger fw-bolder"}>{totalAmount}</h5>
            </div>
            <div className=" bg-white mx-0 my-3 py-3 d-flex  justify-content-around">
                <div className=" ">
                    <h5 className="text-success">Income</h5>
                    <strong className="  text-success" id="income">{income}</strong>
                </div>
                <div className="">
                    <h5 className=" text-danger">Expencen</h5>
                    <strong className="text-danger" id="expense">{expace}</strong>
                </div>
            </div>
            <div className=" ">
                <h4 className=" text-center py-3 bg-warning w-100 his">
                    History
                    <span className={allData.length===0 ? 'd-none':'translate-middle badge rounded-pill bg-white text-dark ms-2 py-1 px-2'} >{allData.length}</span>

                </h4>
                <div className=" py-4 px-3 bg   height  position-relative" >
               
               
              

                    <ul className=" ">

                        {allData.map((curElm)=>{
                            const{text,amount,id}=curElm;
                            return(
                                <li
                                    key={id} className=
                                    {amount>0?" d-flex flex-wrap justify-content-between bg-success shadow-sm p-2 my-3 rounded minus":" d-flex flex-wrap justify-content-between bg-danger shadow-sm p-2 my-3 rounded minus"}
                                    >
                                    <span className="item-name p-2 text-dark" id="item-name">{text}</span
                                    ><span className="item-amount ms-auto p-2 text-dark" id="amount" >{amount}</span
                                    ><span className="delete-history-item bg-secondary  p-2 rounded" onClick={()=>deleteItem(id)}
                                        > <FaTrashAlt className="text-white trash-hover"></FaTrashAlt></span>
                                </li>
                            )
                        })}

                    </ul>
                </div>
            </div>


            <div className="form-section my-3">
                <h4 className=" bg-warning   text-center py-2 w-100"> Add Transaction</h4>

                <form onSubmit={managementControl}>
                    <div className="form-group mb-3">
                    
                      <input type="text" value={text} onChange={(e)=>{setText(e.target.value)}}  placeholder="Text" className="form-control" id="text-input" aria-describedby="emailHelp"/>
                   
                    </div>
                    <div className="form-group">
                      <input type="number"  value={amount}
                      onChange={
                          (e:any)=>{e>0?setAmount(-e.target.value):setAmount(+e.target.value)}
                        } 
                          placeholder="amount" className="form-control" id="amount-input"/>
                      <small id="emailHelp" className="form-text text-muted">Note: use <span className="text-danger">negative(-)</span> value for expence</small>
                    </div>
                   
                    <button type="submit"  className="btn btn-primary my-2 d-block w-100">ADD</button>
                  </form>
            </div>
        </div>

        </div>

           
        </div>

    

        </>
    )
    
}