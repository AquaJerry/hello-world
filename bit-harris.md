# intro

## abstraction

- device
  - terminal
  - diode, transistor, ...
- analog circuit
  - continuous voltage
  - amplifier, filter, ...
- digital circuit
  - discrete voltage (0, 1)
  - logic gates
- logic
  - adder, cache, ...
- microarchitecture (mArch)
  - data path, controller, ...
- architecture
  - regs, isa, ...
  - An architecture may have different mArchs.
- os
  - driver, programs, ...
- app

## discipline

- constraints
- plug-in

## 3Y

- hierarchy
  - levels
  - modules in level
- modularity
  - interfaces
  - side-effect free
- regularity
  - consistent
  - reusable

## digital abstraction

- amount of info (D)
  - D = log(2, N), N is amount of states
  - The more bits, the bigger D is.
- noises, errors, ...
- boolean logic

## Byte, nibble, word

- Byte: 8
- nibble: 4
- word: 8n, n in N+
- lsb: least significant bit
- msb: most significant bit
- LSB: Least Significant Byte
- MSB: Most Significant Byte

```
0b101100
  ^    ^
  msb  lsb

0xdeafdad8
  ^^    ^^
  MSB   LSB
```

## add

- carry bit
- overflow

## signed

- sign/magnitude
- 1's complement
- 2's complement
  - one '0'
  - weird number: -2^(n-1), n is amount of bits
  - overflow: operand same sign, result other sign
  - sext: sign extension

## logic gate

- buffer
  - Digital abstraction ignores the effect of buffers.
- inverter (not, minus)
  - buffer + bubble
- intersection (and, times)
- union (or, plus)
- parity (xor, not equal)

## noise margin (NM)

- 0: ground (gnd, lowest voltage)
- `V_DD`: highest voltage
- `NM_L = V_IL - V_OL`
  - `NM_L`: noise margin of low level
  - `V_IL`: input lowest voltage
  - `V_OL`: output lowest voltage
- `NM_H = V_OH - V_IH`
  - `NM_H`: noise margin of high level
  - `V_OH`: output highest voltage
  - `V_IH`: input lowest voltage

## unity gain point

- dV(Y) / dV(A) = -1
  - dV: delta of voltage
  - Y: output
  - A: input
  - `{X = V_IL, Y = V_OH}, {X = V_IH , Y = V_OL}`

## static discipline

Logic Level of Logic Family

        | V_DD | V_IL | V_IH | V_OL | V_OH 
---:----|-----:|-----:|-----:|-----:|-----:
 TTL    | 5    | 0.8  | 2.0  | 0.4  | 2.4  
 CMOS   | 5    | 1.35 | 3.15 | 0.33 | 3.84 
 LVTTL  | 3.3  | 0.8  | 2.0  | 0.4  | 2.4  
 LVCMOS | 3.3  | 0.9  | 1.8  | 0.36 | 2.7  

- TTL: transistor-transistor logic
- CMOS: complementary metal-oxide-semiconductor logic
- LVTTL: low voltage ttl
- LVCMOS: low voltage cmos

---

Compatibility of Logic Family

        | TTL | CMOS | LVTTL   | LVCMOS  
---:----|--:--|--:---|----:----|----:----
 TTL    | Yes | No   | Partial | Partial 
 CMOS   | Yes | Yes  | Partial | Partial 
 LVTTL  | Yes | No   | Yes     | Yes     
 LVCMOS | Yes | No   | Yes     | Yes     

- First line: receivers
- First column: drivers

