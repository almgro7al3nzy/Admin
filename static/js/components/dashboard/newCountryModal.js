import React from "react";

import {Modal} from 'react-bootstrap'

class NewCountry extends  React.Component{

    state ={ show: false , 
        flag: 'https://storage.googleapis.com/tok-app-bucket/flags/001-egypt.png' ,
        name_ar: 'مصر', name :  'egypt' }

    onChange =(e) => {
        this.setState({ [e.target.name] : e.target.value})
    }

    onAddCountry = () => {

        this.setState({err: false, success: false})
      
        let {name, name_ar, flag } = this.state 

      if(!name|| !name_ar || !flag){
          this.setState({err: 'الرجاء ادخال جميع البيانات'})
      }else{

        let  url = flag
          this.props.onAddCountry(name, name_ar, url )

          this.setState({success: 'تم اضافة الدولة بنجاح'})

      }


    }
    render(){


        let flags = [{flag: 'https://storage.googleapis.com/tok-app-bucket/flags/001-egypt.png' ,name_ar: 'مصر', name :  'egypt'}, 

        {flag: 'https://storage.googleapis.com/tok-app-bucket/flags/002-algeria.png' ,name_ar: 'الجزائر', name :  'algeria'}, 
        {flag: 'https://storage.googleapis.com/tok-app-bucket/flags/003-sudan.png' ,name_ar: 'السودان', name :  'sudan'},
        {flag: 'https://storage.googleapis.com/tok-app-bucket/flags/004-iraq.png' ,name_ar: 'العراق', name :  'iraq'},
        {flag: 'https://storage.googleapis.com/tok-app-bucket/flags/005-morocco.png' ,name_ar: 'المغرب', name :  'morocco'},
        {flag: 'https://storage.googleapis.com/tok-app-bucket/flags/006-saudi-arabia.png' ,name_ar: 'السعودية', name :  'saudi arabia'},
        {flag: 'https://storage.googleapis.com/tok-app-bucket/flags/007-yemen.png' ,name_ar: 'اليمن', name :  'yemen'},
        {flag: 'https://storage.googleapis.com/tok-app-bucket/flags/008-syria.png' ,name_ar: 'سوريا', name :  'syria'},
        {flag: 'https://storage.googleapis.com/tok-app-bucket/flags/009-somalia.png' ,name_ar: 'الصومال', name :  'somalia'},
    {flag: 'https://storage.googleapis.com/tok-app-bucket/flags/010-tunisia.png' ,name_ar: 'تونس', name :  'tunisia'} ,
    {flag: 'https://storage.googleapis.com/tok-app-bucket/flags/011-jordan.png' ,name_ar: 'الاردن', name :  'jordan'} ,
    {flag: 'https://storage.googleapis.com/tok-app-bucket/flags/012-united-arab-emirates.png' ,name_ar: 'الامارات', name :  'united arab emirates'},
    {flag: 'https://storage.googleapis.com/tok-app-bucket/flags/013-libya.png' ,name_ar: 'ليبيا', name :  'libya'},
    {flag: 'https://storage.googleapis.com/tok-app-bucket/flags/014-palestine.png' ,name_ar: 'فلسطين', name :  'palestine'},
    {flag: 'https://storage.googleapis.com/tok-app-bucket/flags/015-oman.png' ,name_ar: 'عمان', name :  'oman'},
    {flag: 'https://storage.googleapis.com/tok-app-bucket/flags/016-kwait.png' ,name_ar: 'الكويت', name :  'kwait'},
    {flag: 'https://storage.googleapis.com/tok-app-bucket/flags/017-qatar.png' ,name_ar: 'قطر', name :  'qatar'},
    {flag: 'https://storage.googleapis.com/tok-app-bucket/flags/018-bahrain.png' ,name_ar: 'البحرين', name :  'bahrain'},
    {flag: 'https://storage.googleapis.com/tok-app-bucket/flags/019-lebanon.png' ,name_ar: 'لبنان', name :  'lebanon'}, 
    {flag: 'https://storage.googleapis.com/tok-app-bucket/flags/020-france.png' ,name_ar: 'فرنسا', name :  'france'},
    {flag: 'https://storage.googleapis.com/tok-app-bucket/flags/021-germany.png' ,name_ar: 'المانيا', name :  'germany'},
    {flag: 'https://storage.googleapis.com/tok-app-bucket/flags/022-netherlands.png' ,name_ar: 'نيزرلاند', name :  'netherlands'},
    {flag: 'https://storage.googleapis.com/tok-app-bucket/flags/023-united-states.png' ,name_ar: 'امريكا', name :  'united states'},
    {flag: 'https://storage.googleapis.com/tok-app-bucket/flags/024-belgium.png' ,name_ar: 'بلغاريا', name :  'belgium'},
    {flag: 'https://storage.googleapis.com/tok-app-bucket/flags/024-belgium.png' ,name_ar: 'كندا', name :  'canada'},
  
    {flag: 'https://storage.googleapis.com/tok-app-bucket/flags/books.png' ,name_ar: 'الغرف التعليمية', name :  'education rooms'},

     

    ]

        
    

        return(
            <div>

                <Modal show= {this.props.newCountry} onHide = {this.props.handleNewCountry}>
                    
                    <Modal.Body className="text-center">
                         <h5 className="mt-3">اضافة دولة</h5>



                         <div className="mt-5">

                            <div className = 'text-center'>
                            <img src = {this.state.flag } width = '40' height= '40'/>
</div>                           
                           <input name = 'name_ar'  onChange={this.onChange} className="login-input" placeholder={this.state.name_ar }/>

                    
                           <input name = 'name' onChange={this.onChange}  className="login-input" placeholder={this.state.name}/>

                           <div >
                           <button className = 'btn btn-info px-5 text-light' onClick = {() => this.setState({show: !this.state.show})}>اعلام الدول</button>
                           </div>

                           <div className = 'card shadow mt-3 ' style ={{border: 'none', width: '250px', height: '400px', 
                           position: 'fixed', overflow: 'auto', display : this.state.show ? 'block' : 'none'}}>
                           <div className = 'card-body'>
                           {flags.map(f => (
                            <div className = 'd-flex my-1 py-1 text-center flag' type ='submit' 
                            onClick = {() => {
                                    this.setState({flag: f.flag , name: f.name, name_ar : f.name_ar})
                                }
                            }>
                                <img src= {f.flag} width = '40' height= '40'/>

                                <p className = 'mx-3 my-auto'>{f.name_ar}</p>
                            </div>
                           ))}

                           </div>
                           </div>


                           {this.state.success ? 
                             <p className="text-success">{this.state.success}</p> : ''}

                             {this.state.err ? 
                             <p className="text-danger">{this.state.err}</p> : ''}
                          <div className="mt-4">
                             <button onClick ={this.onAddCountry} className= 'btn btn-warning px-3 mx-3'>اضافة</button>
                              </div>                  

                         </div>
                    </Modal.Body>
                </Modal>

            </div>
        )
    }
}

export default NewCountry
