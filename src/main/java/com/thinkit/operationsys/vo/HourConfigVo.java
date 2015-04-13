/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.thinkit.operationsys.vo;

/**
 * RUN Luck Man
 *
 * @author qiaokai
 * @date 2013-12-19 16:30:23
 */
public class HourConfigVo {

    private int one = 0;
    private int two = 0;
    private int three = 0;
    private int four = 0;
    private int five = 0;
    private int six = 0;
    private int seven = 0;
    private int eight = 0;
    private int nine = 0;
    private int ten = 0;
    private int evelen = 0;
    private int twelve = 0;

    public HourConfigVo() {
    }

    /**
     * @param one
     * @param two
     * @param three
     * @param four
     * @param five
     * @param six
     * @param seven
     * @param eight
     * @param nine
     * @param ten
     * @param evelen
     * @param twelve
     */
    public HourConfigVo(int one, int two, int three, int four, int five, int six, int seven, int eight, int nine, int ten, int evelen, int twelve) {
        this.one = one;
        this.two = two;
        this.three = three;
        this.four = four;
        this.five = five;
        this.six = six;
        this.seven = seven;
        this.eight = eight;
        this.nine = nine;
        this.ten = ten;
        this.evelen = evelen;
        this.twelve = twelve;
    }

    public int getOne() {
        return one;
    }

    public void setOne(int one) {
        this.one = one;
    }

    public int getTwo() {
        return two;
    }

    public void setTwo(int two) {
        this.two = two;
    }

    public int getThree() {
        return three;
    }

    public void setThree(int three) {
        this.three = three;
    }

    public int getFour() {
        return four;
    }

    public void setFour(int four) {
        this.four = four;
    }

    public int getFive() {
        return five;
    }

    public void setFive(int five) {
        this.five = five;
    }

    public int getSix() {
        return six;
    }

    public void setSix(int six) {
        this.six = six;
    }

    public int getSeven() {
        return seven;
    }

    public void setSeven(int seven) {
        this.seven = seven;
    }

    public int getEight() {
        return eight;
    }

    public void setEight(int eight) {
        this.eight = eight;
    }

    public int getNine() {
        return nine;
    }

    public void setNine(int nine) {
        this.nine = nine;
    }

    public int getTen() {
        return ten;
    }

    public void setTen(int ten) {
        this.ten = ten;
    }

    public int getEvelen() {
        return evelen;
    }

    public void setEvelen(int evelen) {
        this.evelen = evelen;
    }

    public int getTwelve() {
        return twelve;
    }

    public void setTwelve(int twelve) {
        this.twelve = twelve;
    }

    public void setData(String num, int data) {
        if (num != null) {
            switch (num) {
                case "1":
                    this.setOne(data);
                    break;
                case "2":
                    this.setTwo(data);
                    break;
                case "3":
                    this.setThree(data);
                    break;
                case "4":
                    this.setFour(data);
                    break;
                case "5":
                    this.setFive(data);
                    break;
                case "6":
                    this.setSix(data);
                    break;
                case "7":
                    this.setSeven(data);
                    break;
                case "8":
                    this.setEight(data);
                    break;
                case "9":
                    this.setNine(data);
                    break;
                case "10":
                    this.setTen(data);
                    break;
                case "11":
                    this.setSix(data);
                    break;
                case "12":
                    this.setTwelve(data);
                    break;
            }
        }

    }

}
