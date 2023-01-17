import React, { useState } from 'react'

export const Floor = () => {
  const [floor, setFloor] = useState([])
  const [floorItemValue, setFloorItemValue] = useState('')
  const [aluthFloorItemName, setFloorItemName] = useState('')
  const [floorItemNamesArr, setFloorItemNamesArr] = useState([
    'a',
    'facilities',
    'openarea',
    'other',
  ])
  const [first_row_data, setFirstRowData] = useState({
    floor_eke_id: '',
    dn_floor_ekt_dil_thin_nm: '',
    floor_ekt_den_aluth_code: '',
    floor_ekt_den_aluth_name: '',
  })

  const handleChange = (element_type, val) => {
    if (element_type == 'floor_add') {
      setFloor([
        ...floor,
        {
          floor_id: Math.random(),
          floor_name: 'floor ' + val,
          floor_items: {
            apprtment: [{ id: Math.random(), name: 'ap1' }],
            facilities: [
              { id: Math.random(), name: 'g1' },
              { id: Math.random(), name: 'p1' },
              { id: Math.random(), name: 's1' },
              { id: Math.random(), name: 'g1' },
              { id: Math.random(), name: 'p1' },
              { id: Math.random(), name: 's1' },
              { id: Math.random(), name: 'g1' },
              { id: Math.random(), name: 'p1' },
              { id: Math.random(), name: 's1' },
              { id: Math.random(), name: 'g1' },
              { id: Math.random(), name: 'p1' },
              { id: Math.random(), name: 's1' },
            ],
            openarea: [{ id: Math.random(), name: 'op1' }],
          },
        },
      ])
      console.log(val, floor)
    }

    if (element_type == 'floor_code') {
      console.log('floor_code ', val)
      setFirstRowData({ ...first_row_data, floor_ekt_den_aluth_code: val })
    }

    if (element_type == 'floor_name') {
      console.log('floor_name ', val)
      setFirstRowData({ ...first_row_data, floor_ekt_den_aluth_name: val })
    }
    if (element_type == 'floor_number') {
      console.log('floor_number ', val)
      setFirstRowData({ ...first_row_data, floor_eke_id: val })
    }

    if (element_type == 'select_floor_item_name') {
      setFloorItemName(val)
    }

    if (element_type == 'floor_item__value') {
      setFloorItemValue(val)
    }
  }
  const handleClick = (element_type) => {
    if (element_type == 'save_btn') {
      var updateFloorArr = floor.filter((item, ind) => {
        if (item.floor_id == first_row_data.floor_eke_id) {
          item.floor_name =
            first_row_data.floor_ekt_den_aluth_code +
            '-' +
            first_row_data.floor_ekt_den_aluth_name
          return item
        } else {
          return item
        }
      })
      setFloor(updateFloorArr)
    }

    if (element_type == 'save_floor_item_btn') {
      var updateFloorArr = floor.filter((item, ind) => {
        if (item.floor_id == first_row_data.floor_eke_id) {
          item.floor_items[`${aluthFloorItemName}`] = []
          return item
        } else {
          return item
        }
      })
      console.log('save_floor_item_btn: ', updateFloorArr)
      setFloor(updateFloorArr)
    }

    if (element_type == 'save_floor_item__value_btn') {
      var updateFloorArr = floor.filter((item, ind) => {
        let previousDataArr = []
        if (item.floor_id == first_row_data.floor_eke_id) {
          if (
            item.floor_items[`${aluthFloorItemName}`] == undefined &&
            item.floor_items[`${aluthFloorItemName}`] == null
          ) {
            previousDataArr.push({ id: Math.random(), name: floorItemValue })
            item.floor_items[`${aluthFloorItemName}`] = previousDataArr
          } else {
            previousDataArr = item.floor_items[`${aluthFloorItemName}`]
            previousDataArr.push({ id: Math.random(), name: floorItemValue })
            item.floor_items[`${aluthFloorItemName}`] = previousDataArr
          }

          return item
        } else {
          return item
        }
      })
      console.log('save_floor_item_btn: ', updateFloorArr)
      setFloor(updateFloorArr)
    }
  }
  return (
    <div className="container-fluid ">
      <div className="row d-flex row1">
        <div className="">
          <input type="text" placeholder="search" />
        </div>
        <div className="">
          <input
            type="number"
            placeholder="No of floors"
            id="number_of_floor"
            onChange={(e) => {
              handleChange('floor_add', e.target.value)
            }}
          />
        </div>
        <div className="">
          <select
            onChange={(e) => {
              handleChange('floor_number', e.target.value)
            }}
            name="select_floor"
            id="select_floor"
            className="p-1"
          >
            <option>Floor no</option>
            {floor && floor.length > 0
              ? floor.map((item, ind) => (
                  <option key={item?.id} value={item?.floor_id}>
                    {item?.floor_name}
                  </option>
                ))
              : ''}
          </select>
        </div>
        <div className="">
          <input
            type="text"
            placeholder="code"
            onChange={(e) => {
              handleChange('floor_code', e.target.value)
            }}
          />
        </div>
        <div className="">
          <input
            type="text"
            placeholder="name"
            onChange={(e) => {
              handleChange('floor_name', e.target.value)
            }}
          />
        </div>
        <div className="pl-2">
          <button
            onClick={(e) => {
              handleClick('save_btn')
            }}
            className="pr-5 pl-5 btn btn-primary"
            type="text"
          >
            save
          </button>
        </div>
      </div>
      <div className="row d-flex row1">
        <div className="">
          <label>
            {floor
              .find((item) => item.floor_id == first_row_data.floor_eke_id)
              ?.floor_name?.toUpperCase()}
          </label>
          <select
            onChange={(e) => {
              handleChange('select_floor_item_name', e.target.value)
            }}
            name="add_floor_items"
            id="add_floor_items"
            className="p-1"
          >
            <option>Add Floor Items</option>
            {floorItemNamesArr.map((item, ind) => (
              <option key={item?.id} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="pl-2 pb-0 pt-0">
          <button
            onClick={(e) => {
              handleClick('save_floor_item_btn')
            }}
            className="pr-5 pl-5 pb-0 btn btn-primary"
            type="text"
          >
            save floor item
          </button>
        </div>
        <div className="">
          <input
            type="text"
            placeholder="enter values"
            id="floor_item__value"
            onChange={(e) => {
              handleChange('floor_item__value', e.target.value)
            }}
          />
        </div>
        <div className="pl-2 pb-0 pt-0">
          <button
            onClick={(e) => {
              handleClick('save_floor_item__value_btn')
            }}
            className="pr-5 pl-5 pb-0 btn btn-success"
            type="text"
          >
            save floor item value
          </button>
        </div>
      </div>

      <div className="row  bg-lightning">
        {floor.map((item) => {
          return (
            <div
              className="col-12 pb-2 pt-2"
              style={{ border: '1px solid black' }}
            >
              <div className="col-12 bg-primary p-0">
                <h2 className="text-center">
                  {item?.floor_name?.toUpperCase()}
                </h2>
              </div>

              <div className="col-12">
                <div className="row">
                  {item?.floor_items &&
                  Object.keys(item?.floor_items).length > 0 ? (
                    <>
                      {Object.keys(item?.floor_items).map((floor_item_name) => {
                        return (
                          <div className="col">
                            <h4 className="text-center bg-danger text-lightning">
                              {floor_item_name?.toUpperCase()}
                            </h4>
                            <div className="row">
                              {item?.floor_items[`${floor_item_name}`] &&
                              item?.floor_items[`${floor_item_name}`].length >
                                0 ? (
                                <>
                                  {item?.floor_items[`${floor_item_name}`].map(
                                    (floor_item_data, ind) => {
                                      return (
                                        <div className="col" key={ind}>
                                          <button className="pl-2 pr-2 pb-0 pt-0 btn btn-success">
                                            {' '}
                                            {floor_item_data?.name}
                                          </button>
                                        </div>
                                      )
                                    },
                                  )}
                                </>
                              ) : (
                                ''
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
