import { useState } from 'react'
import { vaznha, heja, set_exact_matcher, set_fuzzy_matcher } from './vaznha.ts'

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>([]);

  function ganjoor_url(vazn: string): string {
    return encodeURI("https://ganjoor.net/simi/?v=" + vazn);
  }

  function heja_to_unicode(heja: string): string {
    let s = heja;
    s = s.replace(/U/g, '⏑');
    s = s.replace(/_/g, '–');
    return s;
  }

  function display_vaznha(output: string[]) {
    if (output.length == 0) {
      return <> وزن یافت نشد. </>;
    }
    return (
      <ol>
        {output.map((vazn) => (
          <li><a key={vazn} href={ganjoor_url(vazn)} target='_blank' className="text-xl font-serif font-bold">{vazn}</a></li>
        ))}
      </ol>
    );
  }

  function toggle_exact_fuzzy(fuzzy: boolean) {
    if (fuzzy) {
      set_fuzzy_matcher(1);
    } else {
      set_exact_matcher();
    }
    vaznha(input).then((val) => setOutput(val));
  }


  return (
    <>
      <div lang="fa" dir="rtl" className="flex flex-col max-w-lg p-4 mx-auto">
        <span className="label-text p-2 text-md">
          یک مصراع را به فینگلیش وارد کنید.
          <button tabIndex={2} className="badge badge-outline mx-2" onClick={() => (document.getElementById("help_modal") as HTMLDialogElement).showModal()}>چگونه؟</button>
          <dialog tabIndex={-1} id="help_modal" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
              <h3 className="text-lg -mt-2 mb-4">توضیحات</h3>
              <p className="text-start my-2">صدا‌ها
                <span className='badge badge-primary mx-1'>ــَـ a</span>
                <span className='badge badge-primary mx-1'>ــِـ e</span>
                <span className='badge badge-primary mx-1'>ــُـ o</span>
                <span className='badge badge-primary mx-1'>آ aa</span>
                <span className='badge badge-primary mx-1'>ای i</span>
                <span className='badge badge-primary mx-1'>او oo</span>
              </p>
              <p className="text-start my-2">حروف ویژه
                <span className='badge badge-primary mx-1'>چ ch</span>
                <span className='badge badge-primary mx-1'>خ kh</span>
                <span className='badge badge-primary mx-1'>ژ zh</span>
                <span className='badge badge-primary mx-1'>ش sh</span>
                <span className='badge badge-primary mx-1'>ق gh</span>
                <span className='badge badge-primary mx-1'>ع '</span>
                <span className='badge badge-primary mx-1'>ی y</span>
              </p>
              <p>کسره‌ای که تلفظش کشیده‌تر است به صورت ee نوشته می‌شود.</p>
              <p>در کلماتی مانند "نو" و "درو" که حرف واو کشیده تلفظ می‌شود آن را به شکل ow می‌نویسیم.</p>
              <p>در کلماتی مانند "مضحک" که دو حرف فینگلیش (در اینجا h و z) کنار هم می‌آیند و ناخواسته یک حرف ویژه (zh = ژ) می‌سازند آن را به صورت جداگانه <span className='inline-block'>(moz hek)</span> مینویسیم.</p>
              <h3 className="text-lg mt-2">مثال‌ها</h3>
              <ul className="flex flex-col gap-3 justify-center text-center ">
                <li>بر کفی جام شریعت بر کفی سندان عشق <br />bar kafi jaamee shari'at bar kafi sendaane eshgh</li>
                <li>هر که اقرار کرد و باده شناخت<br />har ke eghraar kard o baade shenaakht</li>
                <li>سنبل سیه بر سمن مزن<br />sonbolee siyah bar saman mazan</li>
              </ul>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn btn-md btn-circle btn-ghost absolute left-2 top-2 text-lg">✕</button>
                </form>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
          <div className='inline float-left'>
            دقیق
            <input tabIndex={3} type="checkbox" className="toggle align-middle mx-2" onClick={(event) => toggle_exact_fuzzy(event.currentTarget.checked)} />
            فازی
          </div>
        </span>
        <textarea tabIndex={1} dir="ltr" rows={2} spellCheck="false" autoCorrect='false' autoCapitalize='false' autoComplete='false' placeholder='…' className="textarea textarea-bordered resize-none text-lg" onChange={(event) => { const s = event.target.value.toLowerCase(); setInput(s); vaznha(s).then((val) => setOutput(val)); }}></textarea>
        <div dir="ltr" className="w-full p-2 justify-center font-mono text-4xl">{heja_to_unicode(heja(input))}</div>
        <p className="my-8">{display_vaznha(output)}</p>
      </div >
    </>
  );
}

export default App
