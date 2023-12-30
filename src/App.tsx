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
      <div className="flex flex-col max-w-lg p-4 mx-auto">
        <span className="label-text p-2 text-md">
          یک مصراع را به فینگلیش وارد کنید.
          <div className='inline float-left'>
            دقیق
            <input type="checkbox" className="toggle align-middle mx-2" onClick={(event) => toggle_exact_fuzzy(event.currentTarget.checked)} />
            فازی
          </div>
        </span>
        <textarea dir="ltr" rows={2} spellCheck="false" placeholder='…' className="textarea textarea-bordered resize-none text-lg" onChange={(event) => { setInput(event.target.value); vaznha(event.target.value).then((val) => setOutput(val)); }}></textarea>
        <div dir="ltr" className="w-full p-2 justify-center font-mono text-4xl">{heja_to_unicode(heja(input))}</div>
        <p className="my-8">{display_vaznha(output)}</p>
      </div>
    </>
  );
}

export default App
