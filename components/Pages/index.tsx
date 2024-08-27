import Component, { PageEl } from '@/components/Libs/Component';
import Copy from '@/components/Libs/Copy';
import Router from 'next/router'
import Window from '@/components/Libs/Window';
import TextBox from '@/components/Libs/TextBox';
import Icon2Titles from '@/components/Libs/Icon2Titles';
import Icon3Titles from '@/components/Libs/Icon3Titles';
import css from './css.module.css'
import './css.module.css'
import WindowFloat from '../Libs/WindowFloat';
import { Block } from './Block';



export default p => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps) => {

  let styles = global.styles
  // let name = "خوش آمدید"
  // ------------------------------------------------------------------------------

  state.cart = Array.from(new Set(state.cart))


  let totalprice = 0;
  let count = 0;

  for (let cart of state.cart) {

    let book = props.books.find(book => book.title == cart)
    if (book) {
      totalprice += (book.price as number)
    }
    count += 1;

  }

  return (
    <div style={{ direction: "rtl", minHeight: "11vh", }}>
      <br-x />

      <Window title='سبد خرید' style={{ height: 120, margin: 10, width: "calc(100% - 20px)", backgroundColor: "gainsboro" }}>

        <f-x>
          <f-cc style={{ margin: 10, paddingRight:10 }}>
            <f-12><img src='https://irmapserver.ir/research/12/shopping-cart%20%28m%29.png' style={{ width: 30, height: 30 }} /></f-12>
            <sp-2 />
            <f-12 style={{ fontSize: 20 }}>تعداد کتاب : </f-12>
            <f-12 style={{ fontSize: 20 }}>{(count as number).toLocaleString("fa-IR")}</f-12>
          </f-cc>
        </f-x>

        <f-x>
          <f-cc style={{ fontSize: 20 ,paddingRight:10}}>
            <f-12><img src='https://irmapserver.ir/research/12/dollars.png' style={{ width: 30, height: 30 }} /></f-12>
            <sp-2 />
            <f-12 style={{ fontSize: 20 }}>مجموع قابل پرداخت:  </f-12>
            <sp-2 />

            <f-12 style={{ fontSize: 20 }}>{(totalprice as number).toLocaleString("fa-IR")}</f-12>
            <sp-2 />
            <f-12 style={{ fontSize: 20 }}>تومان</f-12>
          </f-cc>

        </f-x>


      </Window>

      {state.form == "bookspecs" ? <WindowFloat title='مشخصات کتاب' onclose={() => {
        delete state.form
        refresh()
      }}>

        <f-c>
          <f-15>نام کتاب:</f-15>
          <sp-2 />
          <f-15>{state.book.title}</f-15>
        </f-c>

        <f-c>
          <f-15>کشور:</f-15>
          <sp-2 />
          <f-15>{state.book.country}</f-15>
        </f-c>

        <f-c>
          <f-15>زبان:</f-15>
          <sp-2 />
          <f-15>{state.book.language}</f-15>
        </f-c>

        <f-c>
          <f-15>صفحه:</f-15>
          <sp-2 />
          <f-15>{state.book.pages}</f-15>
        </f-c>

        <f-c>
          <f-15>قیمت:</f-15>
          <sp-2 />
          <f-15>{state.book.price}</f-15>
        </f-c>

        <br-x />
        <br-x />

        <f-cse style={{ gap: 10 }}>
          <g-b style={{ height: 40, backgroundColor: "darkblue", color: "white" }} onClick={() => {
            if (!state.fav) {
              state.fav = []
              state.form = null
            }

            state.fav.push(state.book.title)
            state.form = null
            refresh()
          }}>

            <f-12>افزودن به علاقه مندی ها</f-12>
            <sp-3 />
            <f-cc><img src="https://irmapserver.ir/research/12/heart.png" style={{ width: 30, height: 30 }} /></f-cc>

          </g-b>


          <g-b style={{ height: 40, backgroundColor: "darkblue", color: "white" }} onClick={() => {
            if (!state.cart) {
              state.cart = []
            }
            if (state.cart.includes(state.book.title)) {
              state.cart = state.cart.filter(item => item !== state.book.title)
              state.form = null
            }
            else {
              state.cart.push(state.book.title)
              state.form = null

            }
            refresh()
          }}>
            <f-12>افزودن به سبد خرید</f-12>
            <sp-3 />
            <f-cc><img src='https://irmapserver.ir/research/12/cart.png' style={{ width: 30, height: 30 }} /></f-cc>
          </g-b>
        </f-cse>



      </WindowFloat> : null}

      <Window title={"کتاب"} style={{ minHeight: 200, margin: 10, width: "calc(100% - 20px)" }}>
        {/* <pre style={{ direction: "ltr" }}>{JSON.stringify(props, null, 2)}</pre> */}
        <w-cse>

          {props.books.map(book => {
            return <Block
              book={book}
              state={state}
              refresh={refresh} />
          })}
        </w-cse>
      </Window>
    </div>
  )
}


export async function getServerSideProps(context) {


  var session = await global.SSRVerify(context)
  var { uid, name, image, imageprop, lang, cchar,
    unit, workspace, servid, servsecret,
    usedquota, quota, quotaunit, status, regdate, expid,
    role, path, devmod, userip, } = session;

  let books = await global.db.collection("Books").find({}).toArray()

  for (let book of books) {
    book.imageLink = "https://irmapserver.ir/research/ex/books/" + book.imageLink
  }
  console.log(books)

  return {
    props: {
      data: global.QSON.stringify({
        session,
        books,
        // nlangs,
      })
    },
  }
}