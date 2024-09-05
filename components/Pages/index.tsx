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
import { stat } from 'node:fs';



export default p => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps) => {
  getProps(async () => {
    let cart = localStorage.getItem("cart")
    if (cart) {
      state.cart = JSON.parse(cart)
    }

  })

  let styles = global.styles
  // let name = "خوش آمدید"
  // ------------------------------------------------------------------------------

  state.cart = Array.from(new Set(state.cart))
  //state.fav = Array.from(new Set(state.fav))


  let totalprice = 0;
  let count = 0;
  //let favarite = 0

  for (let cart of state.cart) {

    let book = props.books.find(book => book.title == cart)
    if (book) {
      totalprice += (book.price as number)
    }
    count += 1;

  }
  // ------------------------------------
  // for (let fav of state.fav) {
  //   favarite += 1;
  // }

  return (
    <div style={{ direction: "rtl", minHeight: "11vh", }}>
      <br-x />

      <Window title='سبد خرید' style={{ height: 120, margin: 10, width: "calc(100% - 20px)", backgroundColor: "gainsboro" }}>

        <c-x style={{ position: "relative" }}>

          {/* <f-x>
            <f-cc style={{ margin: 10, paddingRight: 10 }}>
              <f-12 style={{ fontSize: 20 }}>تعداد علاقه مندی : </f-12>
              <f-12 style={{ fontSize: 20 }}>{(favarite as number).toLocaleString("fa-IR")}</f-12>
            </f-cc>

          </f-x> */}


          <f-x>
            <f-cc style={{ margin: 10, paddingRight: 10 }}>
              <f-12><img src='https://cdn.ituring.ir/research/12/shopping-cart%20%28m%29.png' style={{ width: 30, height: 30 }} /></f-12>
              <sp-2 />
              <f-12 style={{ fontSize: 20 }}>تعداد کتاب : </f-12>
              <f-12 style={{ fontSize: 20 }}>{(count as number).toLocaleString("fa-IR")}</f-12>
            </f-cc>

          </f-x>

          <f-x>
            <f-cc style={{ fontSize: 20, paddingRight: 10 }}>
              <f-12><img src='https://cdn.ituring.ir/research/12/dollars.png' style={{ width: 30, height: 30 }} /></f-12>
              <sp-2 />
              <f-12 style={{ fontSize: 20 }}>مجموع قابل پرداخت:<b></b>  </f-12>
              <sp-2 />

              <f-12 style={{ fontSize: 20 }}>{(totalprice as number).toLocaleString("fa-IR")}</f-12>
              <sp-2 />
              <f-12 style={{ fontSize: 20 }}>تومان</f-12>
            </f-cc>

          </f-x>
          <img src='https://cdn.ituring.ir/research/12/stack-of-books.png' style={{
            width: 80,
            height: 80,
            position: "absolute",
            right: 800, top: 7
          }} />

        </c-x>





      </Window>

      {state.form == "bookspecs" ? <WindowFloat title='مشخصات کتاب' onclose={() => {
        delete state.form
        refresh()
      }}>
        <c-x style={{ position: "relative" }}>
          <f-c>
            <f-15>نام کتاب:</f-15>
            <sp-2 />
            <f-15>{state.book.title}</f-15>
          </f-c>

          <br-xx />

          <f-c>
            <f-15>کشور:</f-15>
            <sp-2 />
            <f-15>{state.book.country}</f-15>
          </f-c>

          <br-xx />

          <f-c>
            <f-15>زبان:</f-15>
            <sp-2 />
            <f-15>{state.book.language}</f-15>
          </f-c>

          <br-xx />

          <f-c>
            <f-15>صفحه:</f-15>
            <sp-2 />
            <f-15>{(state.book.pages as number).toLocaleString("fa-IR")}</f-15>
          </f-c>

          <br-xx />

          <f-c>
            <f-15>قیمت:</f-15>
            <sp-2 />
            <f-15>{(state.book.price as number).toLocaleString("fa-IR")}</f-15>
            <sp-3 />
            <f-15 style={{ fontSize: 15 }}>تومان</f-15>
          </f-c>
        </c-x>



        <img src='https://cdn.ituring.ir/research/12/book.png' style={{
          width: 80,
          height: 80,
          position: "absolute",
          right: 325, bottom: 70
        }} />

        <br-x />
        <br-x />

        <f-cse style={{ gap: 10 }}>
          <g-b style={{
            height: 40,
            backgroundColor: state.fav.includes(state.book.title) ?
              "indianred" : "darkblue",
            color: "white"
          }}
            onClick={() => {
              if (!state.fav) {
                state.fav = []
                state.form = null
              }
              if (state.fav.includes(state.book.title)) {
                state.fav = state.fav.filter(item => item !== state.book.title)
                state.form = null
              }
              else {
                state.fav.push(state.book.title)
                state.form = null
              }


              refresh()
            }}>

            {state.fav.includes(state.book.title) ?
              <f-cc><img src='https://cdn.ituring.ir/research/12/delete-heart.png' style={{ width: 30, height: 30 }} /></f-cc> : <f-cc><img src='https://cdn.ituring.ir/research/12/heart.png' style={{ width: 30, height: 30 }} /></f-cc>}
            <sp-3 />
            {state.fav.includes(state.book.title) ?
              <f-12>حذف از علاقه مندی ها</f-12> : <f-12>افزودن به علاقه مندی ها</f-12>}

          </g-b>


          <g-b style={{
            height: 40,
            backgroundColor: state.cart.includes(state.book.title) ?
              "indianred" : "darkblue",
            color: "white"
          }}
            onClick={async () => {
              if (!state.cart) {
                state.cart = []
              }
              if (state.cart.includes(state.book.title)) {
                state.cart = state.cart.filter(item => item !== state.book.title)
                localStorage.setItem("cart", JSON.stringify(state.cart))
                state.form = null
                refresh()
                // alert(" کتاب" + " " + state.book.title + " " + " از سبد خرید شما حذف گردید")
                await api("/api/test", state.cart)
              }
              else {
                state.cart.push(state.book.title)
                localStorage.setItem("cart", JSON.stringify(state.cart))
                state.form = null
                refresh()
              }

            }}>

            {state.cart.includes(state.book.title) ?
              <f-cc><img src='https://cdn.ituring.ir/research/12/delete-product.png' style={{ width: 30, height: 30 }} /></f-cc> : <f-cc><img src='https://cdn.ituring.ir/research/12/cart.png' style={{ width: 30, height: 30 }} /></f-cc>}
            <sp-2 />
            {state.cart.includes(state.book.title) ?
              <f-13>حذف از سبد خرید</f-13> : <f-13>افزودن به سبد خرید</f-13>}
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
    book.imageLink = "https://cdn.ituring.ir/research/ex/books/" + book.imageLink
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