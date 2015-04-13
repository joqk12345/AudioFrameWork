/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.thinkit.operationsys.controller;

import com.thinkit.operationsys.service.AudioKeeperInfoCountJsonService;
import com.thinkit.operationsys.vo.HandlingCapacityVo;
import net.sf.json.JSONArray;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.ServletRequestBindingException;
import org.springframework.web.bind.ServletRequestUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.tags.Param;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * @author lenovo
 */
@Controller("demeCotroller")
public class DemoController extends BaseController {

    @RequestMapping("test")
    public String hello() {
        return "stat/home";
    }

    @RequestMapping("testparam")
    public String testparam(HttpServletRequest request, HttpSession session) {
        try {
            Integer twiooId = ServletRequestUtils.getIntParameter(request, "twiooId");

        } catch (ServletRequestBindingException ex) {
            Logger.getLogger(DemoController.class.getName()).log(Level.SEVERE, null, ex);
        }
        return "stat/home";
    }

    @RequestMapping("test/login.do")  // 请求url地址映射，类似Struts的action-mapping  
    public String testLogin(@RequestParam(value = "username") String username, String password, HttpServletRequest request) {
        // @RequestParam是指请求url地址映射中必须含有的参数(除非属性required=false)  
        // @RequestParam可简写为：@RequestParam("username")  

        if (!"admin".equals(username) || !"admin".equals(password)) {
            return "loginError"; // 跳转页面路径（默认为转发），该路径不需要包含spring-servlet配置文件中配置的前缀和后缀  
        }
        return "loginSuccess";
    }

    public ModelAndView doFirst(HttpServletRequest request, HttpServletResponse response) throws Exception {
        Map map = new HashMap();
        map.put("message", "hello world");
        return new ModelAndView("/first.jsp", map);

    }

    public ModelAndView doSecond(HttpServletRequest request, HttpServletResponse response) throws Exception {
        Map map = new HashMap();
        map.put("message", "hello world");
        return new ModelAndView("/second.jsp", map);
    }

    @RequestMapping("/testjson")
    @ResponseBody
    public Map<String, Object> testJson3(Param p) {
        System.out.println("enter....");
        System.out.println("value....==========" + p.getName());
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("code", true);
        return map;
    }

    @RequestMapping("/testjson2")
    @ResponseBody
    public List<HandlingCapacityVo> testJson2(Param p) {
        System.out.println("enter....");
        System.out.println("value....==========" + p.getName());
        HandlingCapacityVo hcv = new HandlingCapacityVo("2013-12-29", "200", "700", "50%", "42%", "50", "36s");
        HandlingCapacityVo hcv1 = new HandlingCapacityVo("2013-12-30", "205", "700", "50%", "42%", "50", "26s");
        HandlingCapacityVo hcv2 = new HandlingCapacityVo("2013-12-31", "2000", "700", "50%", "42%", "50", "39s");
        HandlingCapacityVo hcv3 = new HandlingCapacityVo("2014-1-2", "120", "700", "50%", "42%", "50", "32s");
        HandlingCapacityVo hcv4 = new HandlingCapacityVo("2014-1-3", "260", "700", "50%", "42%", "50", "37s");
        HandlingCapacityVo hcv5 = new HandlingCapacityVo("2014-1-4", "78", "700", "50%", "42%", "50", "26s");

        List<HandlingCapacityVo> a = new ArrayList<HandlingCapacityVo>();
        a.add(hcv);
        a.add(hcv1);
        a.add(hcv2);
        a.add(hcv3);
        a.add(hcv4);
        a.add(hcv5);
        return a;
    }

    @RequestMapping("/testjson1")
    public String testJson1(Param p, HttpServletResponse response) throws SQLException, IOException {
        System.out.println("enter....");
        System.out.println("value....==========" + p.getName());
        HandlingCapacityVo hcv = new HandlingCapacityVo("2013-12-29", "200", "700", "50%", "42%", "50", "36s");
        HandlingCapacityVo hcv1 = new HandlingCapacityVo("2013-12-30", "205", "700", "50%", "42%", "50", "26s");
        HandlingCapacityVo hcv2 = new HandlingCapacityVo("2013-12-31", "2000", "700", "50%", "42%", "50", "39s");
        HandlingCapacityVo hcv3 = new HandlingCapacityVo("2014-1-2", "120", "700", "50%", "42%", "50", "32s");
        HandlingCapacityVo hcv4 = new HandlingCapacityVo("2014-1-3", "260", "700", "50%", "42%", "50", "37s");
        HandlingCapacityVo hcv5 = new HandlingCapacityVo("2014-1-4", "78", "700", "50%", "42%", "50", "26s");
        HandlingCapacityVo hcv6 = new HandlingCapacityVo("2014-1-5", "963", "700", "50%", "42%", "50", "26s");
        HandlingCapacityVo hcv7 = new HandlingCapacityVo("2014-1-6", "250", "700", "50%", "42%", "50", "25s");
        HandlingCapacityVo hcv8 = new HandlingCapacityVo("2014-1-7", "270", "700", "50%", "42%", "50", "26s");
//                    JSONArray array = new JSONArray();

        JSONArray array1 = new JSONArray();
        array1.add(hcv.toJSONObject());
        array1.add(hcv1.toJSONObject());
        array1.add(hcv2.toJSONObject());
        array1.add(hcv3.toJSONObject());
        array1.add(hcv4.toJSONObject());
        array1.add(hcv5.toJSONObject());
        array1.add(hcv6.toJSONObject());
        array1.add(hcv7.toJSONObject());
        array1.add(hcv8.toJSONObject());
        AudioKeeperInfoCountJsonService akicshcp = new AudioKeeperInfoCountJsonService();

        try (PrintWriter pw = response.getWriter()) {
            pw.print(akicshcp.getHandlingCapacityJson("", "").toString());
            pw.close();
        } catch (SQLException ex) {
            logger.info("sql 异常");
        }

        return akicshcp.getHandlingCapacityJson("", "").toString();
    }

}
