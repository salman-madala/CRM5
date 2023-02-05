import {useQuery} from'react-query'



const createCustomers = async (obj) => {
  console.log("obj",obj);
  // return ContactService.createCustomer(obj);
}
export const useCustomerRQCalls = (customer) => {


  const {refetch} = useQuery(["create-customers",customer],()=>createCustomers(customer), {
    enabled: false,
    //refetchOnMount: true,
    refetchOnWindowFocus: false,
    select: (data) => {
      console.log("createCustomers : ",data)
      // const res = data.data.outputs !== undefined
      //   ? data.data.outputs.customers.map((order, index) => {
      //     var content = data.data.__refs[`outputs.customers[${index}]`];
      //     return content;
      //   })
      //   : [];
      // return res
    },
    // refetchInterval:1000
    //refetchIntervalInBackground:1000,    
  })

 const createCustomer = (customer) =>{
  refetch()
 } 

//  const getAll = () =>{

//    useQuery("get-customers", getAllCustomers, {
//     enabled: false,
//     //refetchOnMount: true,
//     refetchOnWindowFocus: false,
//     select: (data) => {
//       const res = data.data.outputs !== undefined
//         ? data.data.outputs.customers.map((order, index) => {
//           var content = data.data.__refs[`outputs.customers[${index}]`];
//           return content;
//         })
//         : [];
//       return res
//     },
//     // refetchInterval:1000
//     //refetchIntervalInBackground:1000,    
//   })

 //}

  return {createCustomer}

}

