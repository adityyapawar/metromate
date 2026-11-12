import { describe, it, expect } from "vitest";
import { planRoute, type Journey } from "./route";
const j = (a: string, b: string) => planRoute(a, b) as Journey;
describe("route engine", () => {
  it("same line, both directions", () => {
    const f = j("pcmc", "swargate"), r = j("swargate", "pcmc");
    expect(f.legs).toHaveLength(1); expect(f.hops).toBe(13); expect(r.stops).toEqual([...f.stops].reverse());
    expect(r.legs[0].towards).toBe("PCMC");
  });
  it("cross-line via District Court", () => {
    const x = j("vanaz", "swargate");
    expect(x.interchanges).toEqual(["district-court"]); expect(x.legs.map((l) => l.line)).toEqual(["aqua", "purple"]);
    expect(j("khadki", "ramwadi").interchanges).toEqual(["district-court"]);
  });
  it("aliases and extra pairs", () => {
    expect(j("shivaji-nagar", "district-court").hops).toBe(1); expect(j("garware-college", "pune-railway-station").legs).toHaveLength(1);
    expect(j("kasba-peth", "rto-pune").interchanges).toEqual(["district-court"]);
  });
  it("invalid input", () => {
    expect("error" in planRoute("vanaz", "vanaz")).toBe(true); expect("error" in planRoute("vanaz", "nowhere")).toBe(true);
  });
});
