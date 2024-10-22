import React, { useEffect, useState } from 'react'
import Type from './Type'
import { DamageRelations as DamageRelationsProps } from "../types/DamageRelationOfPokemonTypes"
import { SeparateDamages } from '../types/SeparateDamageRelations'

interface DamageModalProps {
  damages: DamageRelationsProps[]
}

// 데미지 받는거만 구현됨. from
const DamageRelations = ({ damages }: DamageModalProps) => {

  const [damagePokemonForm, setDamagePokemonForm] = useState<SeparateDamages>()

  useEffect(() => {
    const arrayDamage = damages.map((damage) =>
      separateObjectBetweenToAndFrom(damage)
    )

    if (arrayDamage.length === 2) {
      const obj = joinDamageRelations(arrayDamage)
      setDamagePokemonForm(reduceDuplicateValues(postDamageValue(obj.from)))
    } else {
      console.log(JSON.stringify(postDamageValue(arrayDamage[0].from)))
      setDamagePokemonForm(postDamageValue(arrayDamage[0].from))
    }
  }, [])

  const joinDamageRelations = (props) => {
    return {
      to: joinObjects(props, "to"),
      from: joinObjects(props, "from"),
    }
  }

  // from, to 순서로 props에 있는 값을 불러온다음
  const joinObjects = (props, string) => {
    const key = string
    const firstArrayValue = props[0][key] // from
    const secondArrayValue = props[1][key] // to

    const result = Object.entries(secondArrayValue).reduce(
      (acc, [keyName, value]) => {
        const result = firstArrayValue[keyName]?.concat(value)

        return (acc = { [keyName]: result, ...acc })
      },
      {}
    )
    return result
  }

  // 중복되는 속성이 있으면 합쳐줌. 2배 2배를 합치면 4배가 됨.
  const reduceDuplicateValues = (props) => {
    const duplicateValues = {
      double_damage: "4x",
      half_damage: "1/4x",
      no_damage: "0x",
    }

    const result = Object.entries(props).reduce((acc, [keyName, value]) => {
      const key = keyName

      const verifiedValue = filterForUniqueValues(value, duplicateValues[key])

      return (acc = { [keyName]: verifiedValue, ...acc })
    }, {})
    return result
  }

  // 같은이름 찾는 함수
  const filterForUniqueValues = (valueForFiltering, damageValue) => {
    const array = []

    return valueForFiltering.reduce((acc, currentValue) => {
      const { url, name } = currentValue
      const filterACC = acc.filter((a) => a.name !== name)

      return filterACC.length === acc.length
        ? (acc = [currentValue, ...acc])
        : (acc = [{ damageValue: damageValue, name, url }, ...filterACC])
    }, [])
  }

  const postDamageValue = (props) => {
    const result = Object.entries(props).reduce((acc, [keyName, value]) => {
      const key = keyName

      const valuesOfKeyName = {
        double_damage: "2x",
        half_damage: "1/2x",
        no_damage: "0x",
      }

      return (acc = {
        [keyName]: value.map((i) => ({
          damageValue: valuesOfKeyName[key],
          ...i,
        })),
        ...acc,
      })
    }, {})
    return result
  }

  // damage 배열을 받아서 from과 to 글자가 들어있는 두 분류로 나눠줌.
  const separateObjectBetweenToAndFrom = (damage) => {
    const from = filterDamageRelations("_from", damage)

    const to = filterDamageRelations("_to", damage)

    return { from, to }
  }

  // valuefilter값을 기준으로 damage 배열을 분류하고 acc 반환값에 from과 to 값을 없애고 반환함.
  const filterDamageRelations = (valueFilter, damage) => {
    const result = Object.entries(damage)
      .filter(([keyname, value]) => {
        return keyname.includes(valueFilter)
      })
      .reduce((acc, [keyName, value]) => {
        const keyWithValueFilterRemove = keyName.replace(valueFilter, "")

        return (acc = { [keyWithValueFilterRemove]: value, ...acc })
      }, {})
    return result
  }

  return (
    <div className="flex gap-2 flex-col">
      {damagePokemonForm ? (
        <>
          {Object.entries(damagePokemonForm).map(([keyName, value]) => {
            const key = keyName
            const valuesOfKeyName = {
              double_damage: "Weak",
              half_damage: "Resistant",
              no_damage: "Immune",
            }
            return (
              <div key={key}>
                <h3 className="capitalize font-medium text-sm md:text-base text-slate-500 text-center ">
                  {valuesOfKeyName[key]}
                </h3>
                <div className="flex flex-wrap gap-1 justify-center">
                  {value.length > 0 ? (
                    value.map(({ name, url, damageValue }) => {
                      return (
                        <Type type={name} key={url} damageValue={damageValue} />
                      )
                    })
                  ) : (
                    <Type type={"none"} key={"none"} />
                  )}
                </div>
              </div>
            )
          })}
        </>
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default DamageRelations