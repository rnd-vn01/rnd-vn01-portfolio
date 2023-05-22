import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          error: "Error...",
          general: {
            "point": "point",
            "meridian": "meridian",
            "points": "points",
            "meridians": "meridians",
          },
          hometitle: {
            sub: "welcome to",
            project_name: "3D Acupuncture Healthcare Data Management And Treatment System",
            instruction: "click to start"
          },
          footer_bar: {
            start_quiz: "Start Quiz"
          },
          auth_bar: {
            sign_up: "Sign Up",
            log_in: "Log In",
            menu: {
              personal_records: "Personal Records",
              data_management: "Data Update",
              log_out: "Log Out",
              edit_profile: "Edit Profile",
              about_us: "About Us",
              start_quiz: "Start Quiz",
              advanced_search: "Advanced Search",
              home: "Home",
              manual: "How To Use",
              language: "Language"
            }
          },
          create_account_page: {
            title: "Create an Account",
            already_have_account: "already have an account?",
            click_here: "click here",
            fields: {
              name: "Name",
              email: "Email",
              password: "Password",
              confirm_password: "Confirm Password"
            },
            button_captions: {
              create_account: "Create account",
              sign_up_with_google: "Sign up with Google"
            },
            messages: {
              account_created: "Your account is created! Please check your email to verify your account!",
              type_in_email: "Please type in your email!",
              invalid_email: "Your email is invalid!",
              duplicated_email: "Email is already in use!",
              invalid: "Invalid!",
              fill_name: "Please fill in your name!",
              invalid_password: "Your password is invalid!",
              invalid_confirmation: "Invalid confirmation!",
            }
          },
          login_page: {
            title: "Log in",
            dont_have_account: "don't have an account?",
            click_here: "click here",
            forget_password: "forgot password?",
            fields: {
              email: "Email",
              password: "Password",
            },
            button_captions: {
              login: "Log in",
              sign_in_with_google: "Sign in with Google"
            },
            messages: {
              invalid_email: "Your email is invalid!",
              invalid: "Invalid!",
              invalid_password: "Your password is invalid!",
              not_verified: "Please verify your account through email!",
              not_found: "Your login information is not correct!",
              login_to_continue: "Please log in to continue!",
              save_quiz_error: "Error occured. Quiz's result cannot be saved!",
              records_error: "Error occured. Cannot get the personal records!",
              login_successful: "Login successfully",
              wait_for_redirect: "Login successfully. Please wait for a moment!"
            }
          },
          quiz_page: {
            title: "Quiz",
            end: "Finished",
            options: {
              testing: "testing",
              questions: "questions",
              all_meridians: "all meridians",
              meridian_only: "meridian only"
            },
            buttons: {
              start: "Start",
              close: "Close",
              next: "Next",
              end: "End",
              skip: "Skip",
              new_quiz: "New Quiz",
              confirmation: "Confirm"
            },
            captions: {
              result: "Quiz Result",
              options: "Options",
              details: "Details",
              question: "Question",
              correct: "Correct",
              wrong: "Wrong",
              seconds: "Seconds",
              time_over: "Time Over / Skipped",
              view_stats: "view personal records"
            },
            questions: {
              description: "Which acupuncture point has the following description: ",
              functionalities: "The following symptoms and diseases are normally cured using which acupuncture point: ",
              choose_from_location: "The marked location on the model is of which of the following acupuncture points?",
              navigate: "Find the position of acupuncture point {POINT_NAME} on the model besides? (Click on the selected location on the model)",
              identify_location: "Which of the 4 marked acupuncture point locations on the model besides is of point {POINT_NAME}?",
            },
            alerts: {
              select_one: "Please select a point on the model to submit the answer."
            }
          },
          title_bar: {
            menu: {
              personal_records: "Personal Records",
              data_management: "Data Update",
              log_out: "Log Out",
              sign_up: "Sign Up",
              log_in: "Log In",
              edit_profile: "Edit Profile"
            },
            pages: {
              default: "",
              advanced_search: "Advanced Search",
              data_management: "Data Update",
              personal_records: "Personal Records",
              about_us: "About Us",
              edit_profile: "Edit Profile",
              manual: "How To Use"
            }
          },
          advanced_search_page: {
            title: "Advanced Search",
          },
          search_bar: {
            matches: "matches",
            filters: {
              categories: {
                search: "Search",
                show: "Show",
                sort: "Sort",
              },
              options: {
                search_on: "search on",
                search_by: "search by",
                show: "show",
                ascending: "ascending",
                descending: "descending",
                sort: "sort"
              }
            },
            placeholder: "Search..."
          },
          data_management_page: {
            title: "Data Update",
          },
          placeholders: {
            name: "name",
            code: "code",
            description: "description",
            anatomy: "location",
            add_new_functionality: "add new functionality",
            functionality: "functionality",
            technique: "triggering technique",
            add_caution: "add caution",
            caution: "caution",
            point: "point",
            add_new_point: "add new point"
          },
          edit_page: {
            caution: "caution: fields remained blank would be skipped in saving",
            demo_caution: "Please be informed that the UI is for demo purpose, so no update would be made. The following\
            are the content of the detail after update:",
            warning: "Warning",
            update_result: {
              success: "Updated successfully!",
              failed: "Error occured! Could not update the information."
            }
          },
          personal_records_page: {
            title: "Personal Records"
          },
          records: {
            summary: {
              summary: "Summary",
              options: {
                all_time: "all time",
                this_year: "this year",
                this_month: "this month",
                this_week: "this week"
              },
              showing: "showing",
              caption: {
                learnt: "quized",
                quiz_attempted: "quizzes",
                accuracy_rate: "accuracy rate"
              }
            },
            progress_log: {
              options: {
                progress: "Progress",
                log: "Log"
              }
            },
            chart: {
              by: "by",
              from: "from",
              to: "to",
              time_units: {
                day: "day",
                week: "week",
                month: "month",
                year: "year"
              },
              caution: "\"From\" date must be before or equal to \"to\" date",
              total: "total",
              learnt: "quized so far"
            }
          },
          about_page: {
            title: "About Us",
            sections: {
              description: "Description",
              rnd: "Research & Development Project",
              client: "Client",
              dr: "Dr.",
              supervisor: "Supervisor",
              nhan_le_thi: "Nhan Le Thi",
              lecturer_hcmus: "Senior Lecturer at University of Science - VNU HCM",
              development_team: "Development team",
              members: {
                nhan_nguyen_cao: "Nhan Nguyen Cao",
                tan_le_tran_ba: "Tan Le Tran Ba",
                trang_ho_ngoc_thao: "Trang Ho Ngoc Thao",
                chuong_pham_dinh: "Chuong Pham Dinh"
              },
              roles: {
                business_analyst: "Business Analyst",
                front_end_dev: "Front-end Developer",
                project_manager: "Project Manager",
                designer: "Designer",
                back_end_dev: "Back-end Developer",
                quality_engineer: "Quality Engineer",
              },
              mmed: "MMed.",
              consultants: {
                title: "Consultants",
                minh_ma_hoang: "Minh Ma Hoang",
                van_le_thi_tuong: "Van Le Thi Tuong",
                acupuncturist: "Acupuncturist",
                visiting_lecturer: "Visiting lecturer at Ho Chi Minh City University of Medicine and Pharmacy",
                lecturer: "Lecturer at Pham Ngoc Thach University of Medicine"
              },
              users: {
                title: "Users",
                description: "Medical University students at Ho Chi Minh City Medicine and Pharmacy University"
              },
              resources: "Resources",
              model: "Study Human Male Sculpt 3D Model"
            },
            description: {
              project: `
                The 3D Acupuncture Data Management and Treatment System is a technical solution aimed to support medical
                university students and researchers in the sub-field of Acupuncture in Traditional Chinese Medicine, focusing
                on providing support in exploring, studying about the acupuncture points and meridians of human body. The system
                provides an interactive 3D model to visualize the positions of acupuncture points and meridians, as well as 
                some basic functionalities allowing searching for trusted specialized knowledge about the meridians and acupuncture points.
              `,
              rnd: `
                Research and Development Project is a paper of the Bachelor's program in Computer and Information Sciences
                of Auckland University of Technology, New Zealand, in association with University of Science - Vietnam National 
                University of Ho Chi Minh City. The project lasts for 8 months, aiming to build a product that serves the requirements
                of the client and end-users, as well as give the students the opportunity to familiarize themselves with the procedure
                of implementing a professional project in business environment.
              `
            }
          },
          password_reset_page: {
            title: "Password Reset",
            login: "login?",
            fields: {
              email: "Email",
              password: "Password",
            },
            button_captions: {
              reset_password: "Reset Password",
            },
            messages: {
              reset_email_sent: "Please check your email to get the link for resetting password!"
            }
          },
          edit_profile_page: {
            title: "Edit Profile",
            button_captions: {
              update_profile: "Update"
            }
          },
          no_results: "No results found",
          meridian_tooltips: {
            "BL": "Bladder",
            "LU": "Lungs",
            "HT": "Heart",
            "ST": "Stomach",
            "KI": "Kidneys",
            "GB": "Gallbladder",
            "LI": "Large Intestine",
            "SI": "Small Intestine",
            "Liv": "Liver",
            "PC": "Pericardium",
            "TE": "Triple Energizer",
            "SP": "Spleen",
            "Du": "Governing Vessel",
            "Ren": "Conception Vessel",
          },
          view_details: "View details",
          view_on_model: "View location on model",
          new_personal_records: {
            days_streak: "days streak"
          },
          exception: {
            cannot_create_account: "Error! Cannot create new account."
          },
          toast: {
            pending: "Updating image",
            success: "Uploaded successfully!",
            error: 'Error occured! Cannot upload image.',
          },
          loading_data: "Loading data",
          storing_quiz_result: "Storing quiz result. Please wait for a moment!",
          getting_records: "Getting personal records. Please wait for a moment!",
          manual_page: {
            title: "How To Use",
            interactions: "Methods to interact with the 3D model",
            desktop: {
              rotate: 'Use left mouse click and drag to rotate around the model',
              pan: 'Use right mouse click and drag to pan along one side of the model',
              zoom: 'Scroll the mouse wheel upwards or downwards to zoom in or zoom out the model',
              hover: 'Hover over the meridian (color will be changed to black) or acupuncture point (color will be changed to yellow) to mark for selection',
              select: 'Click on the meridian line (color changed to red, all acupuncture points of the meridian would be showed) or the acupuncture point (color changed to yellow with red border) to view information about the selected item',
              deselect: 'Deselect by click on the item (acupuncture point or meridian) or double-click on any empty area on the model skin',
              selectMeridian: 'Can quickly select a meridian by choosing from the horizontal scroll menu. After selected, the meridian would be bring into focus (like in the image). Can interact with the model to observer the location of the meridian, or click on the line to view information about the meridian with the acupuncture points involved'
            },
            mobile: {
              rotate: 'Press and drag to the left or right side (swipe) to rotate around the model',
              pan: 'Press 2 fingers and drag along one side to pan along that side of the model',
              zoom: 'Press 2 fingers and spread or pinch to zoom in or zoom out the model',
              selectPoint: 'Single press on an acupuncture point to select the point for viewing detail. To deselect, press on the point or double press on any empty area on the model skin',
              selectMeridian: 'Double press on any area of the meridian (prevent the spaces occupied by the acupuncture points) to select the meridian for viewing detail. To deselect, double press on any empty area on the model skin'
            },
            itemInteraction: "Methods to interact with the acupuncture points or meridians",
            quickMenu: "Menu for quick selecting a meridian"
          },
          click_to_deselect: "Click to deselect",
          reflective: "The meridian is reflective. The model only shows the part of the meridian on one side of the body"
        }
      },
      vi: {
        translation: {
          error: "Lỗi...",
          general: {
            "point": "huyệt đạo",
            "meridian": "kinh lạc",
            "points": "huyệt đạo",
            "meridians": "kinh lạc",
          },
          hometitle: {
            sub: "chào mừng đến với",
            project_name: "Hệ Thống Điều Trị Và Quản Lý Dữ Liệu Châm Cứu 3D",
            instruction: "bấm để bắt đầu"
          },
          footer_bar: {
            start_quiz: "Kiểm tra"
          },
          auth_bar: {
            sign_up: "Đăng Ký",
            log_in: "Đăng Nhập",
            menu: {
              personal_records: "Dữ Liệu Cá Nhân",
              data_management: "Cập Nhật Dữ Liệu",
              log_out: "Đăng Xuất",
              edit_profile: "Cập Nhật Thông Tin",
              about_us: "Về Chúng Tôi",
              start_quiz: "Kiểm Tra",
              advanced_search: "Tìm Kiếm Nâng Cao",
              home: "Trang Chủ",
              manual: "Cách Sử Dụng",
              language: "Ngôn Ngữ"
            }
          },
          create_account_page: {
            title: "Tạo tài khoản",
            already_have_account: "đã có tài khoản?",
            click_here: "bấm vào đây",
            fields: {
              name: "Tên",
              email: "Email",
              password: "Mật khẩu",
              confirm_password: "Xác nhận mật khẩu"
            },
            button_captions: {
              create_account: "Tạo tài khoản",
              sign_up_with_google: "Đăng ký bằng tài khoản Google"
            },
            messages: {
              account_created: "Tài khoản đã được tạo thành công! Vui lòng kiểm tra Email để xác thực tài khoản!",
              type_in_email: "Vui lòng nhập Email!",
              invalid_email: "Email không hợp lệ!",
              duplicated_email: "Email đã được sử dụng!",
              invalid: "Không hợp lệ!",
              fill_name: "Vui lòng nhập tên!",
              invalid_password: "Mật khẩu không hợp lệ!",
              invalid_confirmation: "Xác thực mật khẩu không hợp lệ!",
            }
          },
          login_page: {
            title: "Đăng nhập",
            dont_have_account: "chưa có tài khoản?",
            click_here: "bấm vào đây",
            forget_password: "quên mật khẩu?",
            fields: {
              email: "Email",
              password: "Mật khẩu",
            },
            button_captions: {
              login: "Đăng nhập",
              sign_in_with_google: "Đăng nhập bằng tài khoản Google"
            },
            messages: {
              invalid_email: "Email không hợp lệ!",
              invalid: "không hợp lệ!",
              invalid_password: "Mật khẩu không hợp lệ!",
              not_verified: "Vui lòng xác thực tài khoản qua Email đã đăng ký!",
              not_found: "Thông tin đăng nhập không đúng!",
              login_to_continue: "Vui lòng đăng nhập để tiếp tục!",
              save_quiz_error: "Có lỗi xảy ra. Kết quả bài kiểm tra không thể được lưu trữ!",
              records_error: "Có lỗi xảy ra. Không thể lấy thông tin cá nhân!",
              login_successful: "Đăng nhập thành công",
              wait_for_redirect: "Đăng nhập thành công. Vui lòng chờ trong giây lát"
            }
          },
          quiz_page: {
            title: "Kiểm tra",
            end: "Kết thúc",
            options: {
              testing: "kiểm tra",
              questions: "câu hỏi",
              all_meridians: "tất cả kinh lạc",
              meridian_only: "chỉ kinh lạc"
            },
            buttons: {
              start: "Bắt đầu",
              close: "Đóng",
              next: "Tiếp theo",
              end: "Kết thúc",
              skip: "Bỏ qua",
              new_quiz: "Kiểm tra mới",
              confirmation: "Xác nhận"
            },
            captions: {
              result: "Kết quả bài Kiểm tra",
              options: "Lựa chọn",
              details: "Chi tiết",
              question: "Câu",
              correct: "Đúng",
              wrong: "Sai",
              seconds: "Giây",
              time_over: "Hết giờ / Bỏ qua",
              view_stats: "xem thành tích cá nhân"
            },
            questions: {
              description: "Huyệt đạo nào có mô tả sau: ",
              functionalities: "Những triệu chứng và bệnh sau thường được chữa bởi huyệt đạo nào: ",
              choose_from_location: "Vị trí được đánh dấu trong ảnh là của huyệt đạo nào trong các huyệt đạo dưới đây?",
              navigate: "Tìm vị trí của huyệt đạo {POINT_NAME} trong mô hình bên cạnh? (Chọn vào huyệt đạo ứng với vị trí muốn lựa chọn)",
              identify_location: "Vị trí nào trong 4 vị trí đánh dấu trong mô hình bên cạnh là của huyệt đạo {POINT_NAME}?",
            },
            alerts: {
              select_one: "Vui lòng chọn một huyệt đạo trong mô hình để xác nhận câu trả lời."
            }
          },
          title_bar: {
            menu: {
              personal_records: "Dữ liệu Cá nhân",
              data_management: "Cập nhật Dữ liệu",
              log_out: "Đăng xuất",
              sign_up: "Đăng ký",
              log_in: "Đăng nhập",
              edit_profile: "Cập nhật Thông tin"
            },
            pages: {
              default: "",
              advanced_search: "Tìm Kiếm Nâng Cao",
              data_management: "Cập Nhật Dữ Liệu",
              personal_records: "Dữ Liệu Cá Nhân",
              about_us: "Về Chúng Tôi",
              edit_profile: "Cập Nhật Thông Tin",
              manual: "Cách Sử Dụng"
            }
          },
          advanced_search_page: {
            title: "Tìm kiếm Nâng cao",
          },
          search_bar: {
            matches: "trùng khớp",
            filters: {
              categories: {
                search: "Tìm kiếm",
                show: "Hiển thị",
                sort: "Sắp xếp"
              },
              options: {
                search_on: "tìm trên",
                search_by: "tìm theo",
                show: "hiển thị",
                ascending: "tăng dần",
                descending: "giảm dần",
                sort: "sắp xếp"
              }
            },
            placeholder: "Tìm kiếm..."
          },
          data_management_page: {
            title: "Cập nhật Dữ liệu",
          },
          placeholders: {
            name: "tên",
            code: "mã",
            description: "mô tả",
            anatomy: "vị trí",
            add_new_functionality: "thêm chức năng",
            functionality: "chức năng",
            technique: "phương pháp châm huyệt",
            add_caution: "thêm lưu ý",
            caution: "lưu ý",
            point: "huyệt đạo",
            add_new_point: "thêm huyệt đạo"
          },
          edit_page: {
            caution: "lưu ý: các trường được để trống sẽ không được lưu trữ",
            demo_caution: "Vì giao diện hiện tại đang được sử dụng cho mục đích demo, quá trình cập nhật thông tin\
            sẽ không được thực hiện. Thông tin chi tiết sau khi được cập nhật sẽ bao gồm:",
            warning: "Lưu ý",
            update_result: {
              success: "Đã cập nhật thông tin thành công!",
              failed: "Có lỗi xảy ra! Không thể cập nhật thông tin."
            }
          },
          personal_records_page: {
            title: "Dữ Liệu Cá Nhân"
          },
          records: {
            summary: {
              summary: "Tổng kết",
              options: {
                all_time: "toàn bộ",
                this_year: "năm nay",
                this_month: "tháng này",
                this_week: "tuần này"
              },
              showing: "hiển thị",
              caption: {
                learnt: "đã kiểm tra",
                quiz_attempted: "bài kiểm tra",
                accuracy_rate: "tỉ lệ trả lời đúng"
              }
            },
            progress_log: {
              options: {
                progress: "Tiến độ",
                log: "Chi tiết"
              }
            },
            chart: {
              by: "theo",
              from: "từ",
              to: "đến",
              time_units: {
                day: "ngày",
                week: "tuần",
                month: "tháng",
                year: "năm"
              },
              caution: "Ngày bắt đầu phải trước hoặc bằng ngày kết thúc.",
              total: "tổng",
              learnt: "đã kiểm tra tích luỹ"
            }
          },
          about_page: {
            title: "Về Chúng Tôi",
            sections: {
              description: "Mô tả",
              rnd: "Đồ án Nghiên cứu và Phát triển",
              client: "Khách hàng",
              dr: "TS.",
              supervisor: "Giáo viên Hướng dẫn",
              nhan_le_thi: "Lê Thị Nhàn",
              lecturer_hcmus: "Giảng viên Đại học Khoa học Tự nhiên - ĐHQG TP.HCM",
              development_team: "Nhóm thực hiện",
              members: {
                nhan_nguyen_cao: "Nguyễn Cao Nhân",
                tan_le_tran_ba: "Lê Trần Bá Tân",
                trang_ho_ngoc_thao: "Hồ Ngọc Thảo Trang",
                chuong_pham_dinh: "Phạm Đình Chương"
              },
              roles: {
                business_analyst: "Phân tích Nghiệp vụ",
                front_end_dev: "Lập trình viên Front-end",
                project_manager: "Quản lý Dự án",
                designer: "Thiết kế",
                back_end_dev: "Lập trình viên Back-end",
                quality_engineer: "Kỹ sư Chất lượng",
              },
              mmed: "Ths.BS.",
              consultants: {
                title: "Cố vấn Chuyên môn",
                minh_ma_hoang: "Mã Hoàng Minh",
                van_le_thi_tuong: "Lê Thị Tường Vân",
                acupuncturist: "Bác sĩ Châm cứu",
                visiting_lecturer: "Giảng viên Thỉnh giảng Đại học Y Dược TP.HCM",
                lecturer: "Giảng viên Đại học Y Khoa Phạm Ngọc Thạch"
              },
              users: {
                title: "Người dùng",
                description: "Nhóm Sinh viên Y học Cổ truyền tại Đại học Y Dược TP.HCM"
              },
              resources: "Tài nguyên",
              model: "Mô hình 3D cơ thể người học điêu khắc"
            },
            description: {
              project: `
                Hệ thống Điều trị Và Quản lý Dữ liệu Châm cứu 3D là một giải pháp công nghệ hướng đến mục tiêu hỗ trợ sinh viên hoặc
                những người nghiên cứu về lĩnh vực Châm cứu trong Y học Cổ truyền trong việc tìm hiểu về các kinh lạc, huyệt
                đạo trên cơ thể. Hệ thống cung cấp một mô hình 3D trực quan hoá vị trí các kinh lạc, huyệt đạo, cùng tính
                năng cơ bản cho phép tra cứu thông tin chuyên môn về kinh lạc, huyệt đạo để ghi nhớ.
              `,
              rnd: `
                Đồ án Nghiên cứu và Phát triển là một môn học thuộc chương trình đào tạo Cử nhân về Máy tính và Khoa học
                Thông tin của Trường Đại học Công nghệ Auckland, New Zealand liên kết với Trường Đại học Khoa học Tự nhiên, 
                ĐHQG TP.HCM. Đồ án kéo dài trong khoảng 8 tháng, hướng đến mục tiêu xây dựng một sản phẩm phục vụ nhu cầu của
                khách hàng và người dùng cuối, đồng thời tạo cơ hội để sinh viên làm quen với quy trình triển khai một đồ án
                thật sự trong môi trường doanh nghiệp.
              `
            }
          },
          password_reset_page: {
            title: "Cập nhật Mật khẩu",
            login: "đăng nhập?",
            fields: {
              email: "Email",
            },
            button_captions: {
              reset_password: "Cập nhật Mật khẩu",
            },
            messages: {
              reset_email_sent: "Vui lòng kiểm tra Email để nhận link cập nhật mật khẩu!"
            }
          },
          edit_profile_page: {
            title: "Cập Nhật Thông Tin",
            button_captions: {
              update_profile: "Cập nhật"
            }
          },
          no_results: "Không tìm thấy kết quả",
          meridian_tooltips: {
            "BL": "Bàng quang",
            "LU": "Phế",
            "HT": "Tâm",
            "ST": "Vị",
            "KI": "Thận",
            "GB": "Đởm",
            "LI": "Đại trường",
            "SI": "Tiểu trường",
            "Liv": "Can",
            "PC": "Tâm bào",
            "TE": "Tam tiêu",
            "SP": "Tỳ",
            "Du": "Đốc mạch",
            "Ren": "Nhâm mạch",
          },
          view_details: "Xem chi tiết",
          view_on_model: "Xem vị trí trên mô hình",
          new_personal_records: {
            days_streak: "ngày liên tiếp"
          },
          exception: {
            cannot_create_account: "Lỗi! Không thể đăng ký tài khoản mới."
          },
          toast: {
            pending: "Đang tải ảnh",
            success: "Tải ảnh thành công!",
            error: 'Lỗi! Không thể tải ảnh.',
          },
          loading_data: "Đang tải dữ liệu",
          storing_quiz_result: "Đang lưu kết quả bài kiểm tra. Vui lòng chờ trong giây lát!",
          getting_records: "Đang tải dữ liệu cá nhân. Vui lòng chờ trong giây lát!",
          manual_page: {
            title: "Cách Sử Dụng",
            interactions: "Các phương pháp tương tác với mô hình 3D",
            desktop: {
              rotate: 'Click chuột trái và rê chuột để xoay xung quanh mô hình',
              pan: 'Click chuột phải và rê chuột để di chuyển dọc theo một phía của mô hình',
              zoom: 'Cuộn chuột lên hoặc xuống để phóng to hoặc thu nhỏ mô hình',
              hover: 'Rê chuột lên trên kinh lạc (chuyển thành màu đen) hoặc huyệt đạo (chuyển thành màu vàng) để khoanh vùng chọn cho đối tượng',
              select: 'Click vào kinh lạc (chuyển thành màu đỏ, đồng thời hiển thị toàn bộ huyệt đạo thuộc kinh) hoặc huyệt đạo (chuyển thành màu vàng có viền đỏ) để chọn xem thông tin của đối tượng',
              deselect: 'Bỏ chọn bằng cách click vào đối tượng hoặc click đúp vào bất cứ vùng trống nào trên mô hình',
              selectMeridian: 'Có thể chọn nhanh kinh lạc bằng cách lựa chọn trong menu trượt ngang. Sau khi được lựa chọn, kinh lạc sẽ được hiển thị vào màn hình (giống trong ảnh). Có thể tương tác với mô hình để xem vị trí kinh lạc và bấm vào để xem thông tin chi tiết kinh lạc cùng các huyệt đạo'
            },
            mobile: {
              rotate: 'Ấn và kéo sang trái hoặc phải để xoay xung quanh mô hình',
              pan: 'Ấn 2 ngón và kéo dọc theo một chiều để di chuyển dọc theo một phía của mô hình',
              zoom: 'Ấn 2 ngón và vung ra hoặc vào để phóng to hoặc thu nhỏ mô hình',
              selectPoint: 'Ấn vào một huyệt đạo để chọn xem chi tiết huyệt. Để huỷ chọn huyệt, có thể ấn một lần vào huyệt hoặc ấn đúp vào một vùng trống trên mô hình',
              selectMeridian: 'Ấn đúp vào một vùng trên kinh lạc (tránh vị trí trùng vị trí huyệt đạo) để chọn xem chi tiết kinh lạc. Để huỷ chọn kinh lạc, ấn đúp vào một vùng trống trên mô hình'
            },
            itemInteraction: "Các phương pháp tương tác với huyệt đạo hoặc kinh lạc",
            quickMenu: "Menu chọn nhanh kinh lạc"
          },
          click_to_deselect: "Bấm vào để bỏ chọn",
          reflective: "Kinh lạc có tính đối xứng. Mô hình chỉ hiển thị phần kinh lạc ở một bên của cơ thể"
        }
      }
    }
  });

export default i18n;
