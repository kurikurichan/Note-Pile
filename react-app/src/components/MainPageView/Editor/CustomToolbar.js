import React from 'react'

export default function CustomToolbar() {

    const colors = ["red","green","blue","orange","violet"]
    const formats = [
        [
            {
                className:"ql-font",
                options:['serif','monospace']
            },
            {
                className:"ql-size",
                options:["small","large","huge"]
            }
        ],
        [
            {className:"ql-bold"},{className:"ql-italic"},{className:"ql-underline"},{className:"ql-strike"}
        ],
        [
            {
                className:"ql-color",
                options:colors
            },
            {
                className:"ql-background",
                options:colors
            }
        ],
        [
            {
                className:"ql-script",
                value:"sub"
            },
            {
                className:"ql-script",
                value:"super"
            }
        ],
        [
            {
                className:"ql-header",
                value:"1"
            },
            {
                className:"ql-header",
                value:"2"
            },
            {
                className:"ql-blockquote"
            },
            {
                className:"ql-code-block"
            }
        ],
        [
            {
                className:"ql-list",
                value:"ordered"
            },
            {
                className:"ql-list",
                value:"bullet"
            },
            {
                className:"ql-indent",
                value:"-1"
            },
            {
                className:"ql-indent",
                value:"+1"
            }
        ],
        [
            // {
            //     className:'ql-direction',
            //     value:'rtl'
            // },
            {
                className:'ql-align',
                options:['right','center','justify']
            }
        ],
        // [
        //     {className:'ql-link'},{className:'ql-image'},{className:'ql-video'},{className:'ql-formula'}
        // ],
    ]

    const renderOptions = (formatData)=>{
        const {className, options} = formatData;
        return (
            <select className = {className}>
                <option value="selected"></option>
                {
                    options.map(value =>{
                        return (
                            <option key={value} value={value}></option>
                        )
                    })
                }
            </select>
        )
    }

    const renderSingle = (formatData) => {
        const {className, value} = formatData;
        return (
            <button className = {className} value = {value} key={value}></button>
        )
    }

  return (
    <div id="toolbar">
        {
            formats.map((classes, i) => {
                return (
                    <span className = "ql-formats" key={i}>
                        {
                            classes.map((formatData, i) => {
                                return formatData.options ? renderOptions(formatData) : renderSingle(formatData)
                            })
                        }
                    </span>
                )
            })
        }
    </div>
  )
}
